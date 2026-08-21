import React, { useState } from 'react';
import {
  AuthUser,
  Field,
  Lesson,
  LessonProgress,
  MicroQuiz,
  LessonPlanStep
} from '../types';
import { soundEffects } from '../utils/sound';
import {
  GraduationCap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  AlertCircle,
  PlusCircle,
  Edit3,
  Trash2,
  Video,
  FileText,
  HelpCircle,
  Check,
  Eye,
  Layers,
  Flame
} from 'lucide-react';

interface TeacherViewProps {
  currentUser: AuthUser;
  fields: Field[];
  progress: Record<string, LessonProgress>;
  onAddFieldLesson: (fieldId: string, newLesson: Lesson) => void;
  onUpdateFieldLesson: (fieldId: string, updatedLesson: Lesson) => void;
  onDeleteFieldLesson: (fieldId: string, lessonId: string) => void;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  currentUser,
  fields,
  progress,
  onAddFieldLesson,
  onUpdateFieldLesson,
  onDeleteFieldLesson,
  onNavigate
}) => {
  const isApproved = currentUser.teacherStatus === 'approved';
  const [activeTab, setActiveTab] = useState<'my_lessons' | 'students' | 'all_curriculum'>('my_lessons');
  const [selectedFieldForContent, setSelectedFieldForContent] = useState<string>(
    currentUser.assignedFieldId || 'islom-moliyasi'
  );

  // Lesson Creation / Editing Modal State
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [targetFieldId, setTargetFieldId] = useState<string>(
    currentUser.assignedFieldId || 'islom-moliyasi'
  );

  // Form Fields
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('12 daq. video');
  const [videoUrl, setVideoUrl] = useState('');
  const [lessonText, setLessonText] = useState('');
  const [lessonTakeaways, setLessonTakeaways] = useState('');
  const [lessonTask, setLessonTask] = useState('');
  const [lessonTool, setLessonTool] = useState<Lesson['interactiveTool']>('islamic_murabaha');

  // Quiz 1
  const [q1Question, setQ1Question] = useState('');
  const [q1Options, setQ1Options] = useState(['', '', '', '']);
  const [q1CorrectIdx, setQ1CorrectIdx] = useState(0);
  const [q1Explanation, setQ1Explanation] = useState('');

  // Quiz 2
  const [q2Question, setQ2Question] = useState('');
  const [q2Options, setQ2Options] = useState(['', '', '', '']);
  const [q2CorrectIdx, setQ2CorrectIdx] = useState(0);
  const [q2Explanation, setQ2Explanation] = useState('');

  // Open Create Lesson Modal
  const handleOpenCreateLesson = (fieldId: string) => {
    soundEffects.playClick();
    setEditingLessonId(null);
    setTargetFieldId(fieldId);
    setLessonTitle('');
    setLessonDuration('12 daq. video');
    setVideoUrl('');
    setLessonText('');
    setLessonTakeaways('1. Asosiy dars qoidasi\n2. Bozor va moliya tamoyili\n3. Amaliy hisob-kitob xulosasi');
    setLessonTask('Ushbu mavzu boʻyicha amaliy misol keltirib, oʻz mustaqil tahlilingizni yozing.');
    setLessonTool(fieldId === 'islom-moliyasi' ? 'islamic_murabaha' : undefined);

    setQ1Question('Darsda oʻrganilgan asosiy tamoyil nimadan iborat?');
    setQ1Options(['Kapitalni toʻgʻri va halol boshqarish', 'Xavf-xatarlarni oshirish', 'Faqat qarz hisobiga ishlash', 'Nazoratsiz xarajat qilish']);
    setQ1CorrectIdx(0);
    setQ1Explanation('Moliyaviy intizom va halol sherikchilik barqaror muvaffaqiyat garovidir.');

    setQ2Question('Amaliy auditda ushbu qoidani buzish nimaga olib keladi?');
    setQ2Options(['Moliyaviy yoʻqotish va xatoga', 'Daromadning 10 barobar oshishiga', 'Hech qanday oʻzgarish boʻlmaydi', 'Kompaniya xarajatlari kamayishiga']);
    setQ2CorrectIdx(0);
    setQ2Explanation('Xato hisob-kitoblar moliyaviy barqarorlikka jiddiy putur yetkazadi.');

    setIsLessonModalOpen(true);
  };

  // Open Edit Lesson Modal
  const handleOpenEditLesson = (fieldId: string, lesson: Lesson) => {
    soundEffects.playClick();
    setEditingLessonId(lesson.id);
    setTargetFieldId(fieldId);
    setLessonTitle(lesson.title);
    setLessonDuration(lesson.dur);
    setVideoUrl(lesson.videoPlaceholderUrl || '');
    setLessonText(lesson.text);
    setLessonTakeaways((lesson.keyTakeaways || []).join('\n'));
    setLessonTask(lesson.task);
    setLessonTool(lesson.interactiveTool);

    if (lesson.quizzes && lesson.quizzes[0]) {
      setQ1Question(lesson.quizzes[0].question);
      setQ1Options(lesson.quizzes[0].options);
      setQ1CorrectIdx(lesson.quizzes[0].correctIndex);
      setQ1Explanation(lesson.quizzes[0].explanation);
    }
    if (lesson.quizzes && lesson.quizzes[1]) {
      setQ2Question(lesson.quizzes[1].question);
      setQ2Options(lesson.quizzes[1].options);
      setQ2CorrectIdx(lesson.quizzes[1].correctIndex);
      setQ2Explanation(lesson.quizzes[1].explanation);
    }

    setIsLessonModalOpen(true);
  };

  // Save Lesson
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !lessonText.trim()) return;

    const takeaways = lessonTakeaways
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const q1: MicroQuiz = {
      id: `q1_${Date.now()}`,
      question: q1Question.trim() || 'Test savoli #1',
      options: q1Options.map((o, idx) => o.trim() || `Variant ${idx + 1}`),
      correctIndex: q1CorrectIdx,
      explanation: q1Explanation.trim() || 'Toʻgʻri tushuntirish.'
    };

    const q2: MicroQuiz = {
      id: `q2_${Date.now()}`,
      question: q2Question.trim() || 'Test savoli #2',
      options: q2Options.map((o, idx) => o.trim() || `Variant ${idx + 1}`),
      correctIndex: q2CorrectIdx,
      explanation: q2Explanation.trim() || 'Toʻgʻri tushuntirish.'
    };

    const rejaSteps: LessonPlanStep[] = [
      {
        id: `s1_${Date.now()}`,
        order: 1,
        title: '1. Nazariy asoslar va tushunchalar',
        timeEst: '3 daq.',
        category: 'nazariya',
        description: 'Ustoz tomonidan tayyorlangan nazariy tushuntirish.'
      },
      {
        id: `s2_${Date.now()}`,
        order: 2,
        title: '2. Formulalar va Moliyaviy Sandbox',
        timeEst: '3 daq.',
        category: 'formula',
        description: 'Jonli hisob-kitoblar va formulaviy modellar tahlili.'
      },
      {
        id: `s3_${Date.now()}`,
        order: 3,
        title: '3. Real Keyslar va Amaliy Misollar',
        timeEst: '2 daq.',
        category: 'keys',
        description: 'Bozor va tajribadan olingan amaliy holatlar.'
      },
      {
        id: `s4_${Date.now()}`,
        order: 4,
        title: '4. Nazorat Testi (Micro-Quiz)',
        timeEst: '2 daq.',
        category: 'quiz',
        description: 'Bilimni mustahkamlash uchun 2 ta ekspress test.'
      },
      {
        id: `s5_${Date.now()}`,
        order: 5,
        title: '5. Mustaqil Audit va AI Baholash',
        timeEst: '5 daq.',
        category: 'audit',
        description: 'Yozma amaliy vazifa va AI auditor ekspert xulosasi.'
      }
    ];

    const cleanYoutube = videoUrl.trim() || undefined;

    const lessonData: Lesson = {
      id: editingLessonId || `lesson_${Date.now()}`,
      title: lessonTitle.trim(),
      dur: lessonDuration.trim() || '12 daq. video',
      youtubeUrl: cleanYoutube,
      videoPlaceholderUrl: cleanYoutube,
      text: lessonText.trim(),
      keyTakeaways: takeaways.length > 0 ? takeaways : undefined,
      task: lessonTask.trim() || 'Amaliy tahlilingizni yozing.',
      interactiveTool: lessonTool,
      quizzes: [q1, q2],
      reja: rejaSteps,
      authorTeacher: currentUser.name,
      createdAt: new Date().toLocaleDateString('uz-UZ')
    };

    if (editingLessonId) {
      onUpdateFieldLesson(targetFieldId, lessonData);
    } else {
      onAddFieldLesson(targetFieldId, lessonData);
    }

    soundEffects.playStamp();
    setIsLessonModalOpen(false);
  };

  // Find all lessons created by this teacher
  const myLessons: { field: Field; lesson: Lesson }[] = [];
  fields.forEach((f) => {
    f.lessons.forEach((l) => {
      if (
        l.authorTeacher === currentUser.name ||
        (currentUser.email === 'muhammadali@moliya.uz' && f.id === 'islom-moliyasi')
      ) {
        myLessons.push({ field: f, lesson: l });
      }
    });
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-teal-950/40 via-emerald-950/30 to-slate-900 border-2 border-teal-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono-code font-bold">
            <GraduationCap className="w-4 h-4" /> USTOZ & PEDAGOGIK KABINET
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Xush kelibsiz, {currentUser.name}!
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {currentUser.specialty || 'Moliya va Iqtisodiyot taʼlimi'} boʻyicha ustozlik kabinetingiz. Bu yerda yangi darslar joylashingiz, testlar va mustaqil audit topshiriqlarini kiritishingiz mumkin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {isApproved ? (
            <button
              onClick={() => handleOpenCreateLesson(selectedFieldForContent)}
              className="btn-modern-primary py-3 px-5 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Dars Joylash (Qoʻshish)</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono-code font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>ADMIN TASDIGʻI KUTILMOQDA</span>
            </div>
          )}
        </div>
      </div>

      {/* If Pending Banner */}
      {!isApproved && (
        <div className="p-6 rounded-3xl bg-amber-950/30 border-2 border-amber-400/40 space-y-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Ustozlik arizangiz koʻrib chiqilmoqda
              </h3>
              <p className="text-xs text-slate-300">
                Arizangiz Bosh Administrator tomonidan tasdiqlanishi bilan yangi darslar joylash va boshqarish huquqi faollashadi. Ungacha platforma darsliklari va testlarini koʻrib turishingiz mumkin.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-400/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
            <span className="text-amber-300">
              Ariza yuborilgan sana: <b>{currentUser.registeredDate}</b>
            </span>
            <button
              onClick={() => {
                soundEffects.playClick();
                onNavigate('home');
              }}
              className="btn-modern-primary py-2 px-4 text-xs font-bold font-mono-code flex items-center gap-1.5 cursor-pointer"
            >
              <span>Darslarni koʻrish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Teacher Profile & KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Mening Darslarim</span>
            <BookOpen className="w-4 h-4 text-teal-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-teal-400">
            {myLessons.length}
          </div>
          <div className="text-[11px] text-teal-300 font-mono-code">Platformada faol</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Ustozlik Maqomi</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono-code text-base sm:text-lg font-bold text-white mt-1">
            {isApproved ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Tasdiqlangan
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <Clock className="w-4 h-4" /> Kutilmoqda
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 font-mono-code">
            {currentUser.specialty || 'Moliya ustozi'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>5 Yoʻnalish</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-white">
            {fields.length}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono-code">Barcha sohalar</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>AI Audit Tizimi</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-amber-400">
            Avtomatik
          </div>
          <div className="text-[11px] text-amber-300 font-mono-code">3 mezonli baholash</div>
        </div>
      </div>

      {/* Tabs Switcher for Teachers */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('my_lessons');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'my_lessons'
              ? 'bg-teal-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Darslarni Joylash & Boshqarish ({myLessons.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('all_curriculum');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'all_curriculum'
              ? 'bg-teal-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>5 Ta Yoʻnalish Darsliklari ({fields.reduce((s, f) => s + f.lessons.length, 0)})</span>
        </button>
      </div>

      {/* TAB 1: MY LESSONS & LESSON PUBLISHING */}
      {activeTab === 'my_lessons' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Siz Joylagan Darslar ({myLessons.length} ta)
              </h3>
              <p className="text-xs text-slate-400">
                Oʻquvchilar ushbu darslarni oʻrganadi, testlarni yechadi va mustaqil audit topshiradi.
              </p>
            </div>

            {isApproved && (
              <button
                onClick={() => handleOpenCreateLesson(selectedFieldForContent)}
                className="btn-modern-primary py-2.5 px-4 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20 self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Yangi Dars Joylash</span>
              </button>
            )}
          </div>

          {myLessons.length > 0 ? (
            <div className="space-y-3">
              {myLessons.map(({ field, lesson }, idx) => (
                <div
                  key={lesson.id}
                  className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-400/15 border border-teal-400/30 text-teal-300 font-mono-code font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-900 text-teal-400 border border-teal-400/30 font-bold">
                          {field.name}
                        </span>
                        <h4 className="font-display text-base font-bold text-white">
                          {lesson.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400 flex-wrap">
                        <span className="text-amber-400">⏱️ {lesson.dur}</span>
                        <span>•</span>
                        <span>📋 {lesson.reja?.length || 5} bosqich</span>
                        <span>•</span>
                        <span>❓ 2 ta Quiz</span>
                        {lesson.interactiveTool && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400">⚙️ Sandbox</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEditLesson(field.id, lesson)}
                      className="py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono-code hover:text-teal-300 hover:border-teal-400 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Tahrirlash
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        onNavigate('lesson', field.id, lesson.id);
                      }}
                      className="py-2 px-3 rounded-xl border border-teal-400/30 bg-teal-400/10 text-teal-300 text-xs font-mono-code hover:bg-teal-400 hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" /> Koʻrish
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`"${lesson.title}" darsini oʻchirmoqchimisiz?`)) {
                          soundEffects.playClick();
                          onDeleteFieldLesson(field.id, lesson.id);
                        }
                      }}
                      className="py-2 px-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-mono-code hover:bg-rose-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#111a2e] rounded-3xl border border-slate-800 space-y-4">
              <BookOpen className="w-12 h-12 text-teal-400/50 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-white">
                  Hozircha yangi dars joylanmagan
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isApproved
                    ? 'Yuqoridagi "Yangi Dars Joylash" tugmasi orqali oʻz sohangiz boʻyicha birinchi darsni qoʻshing!'
                    : 'Arizangiz administrator tomonidan tasdiqlangach, dars joylash imkoniyati ochiladi.'}
                </p>
              </div>

              {isApproved && (
                <button
                  onClick={() => handleOpenCreateLesson(selectedFieldForContent)}
                  className="btn-modern-primary py-2.5 px-5 text-xs font-bold font-mono-code inline-flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Dars Joylashni Boshlash</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL 5 FIELDS CURRICULUM */}
      {activeTab === 'all_curriculum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                5 Ta Yoʻnalish Boʻyicha Darsliklar
              </h3>
              <p className="text-xs text-slate-400">
                Platformadagi barcha faol taʼlim darslari roʻyxati.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs text-teal-400 font-bold">
                    {f.num}. {f.tag}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    {f.lessons.length} ta dars
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-white">{f.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onNavigate('field', f.id);
                    }}
                    className="text-xs font-mono-code text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Darslarni koʻrish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {isApproved && (
                    <button
                      onClick={() => handleOpenCreateLesson(f.id)}
                      className="text-xs font-mono-code text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Ushbu sohaga dars qoʻshish</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT LESSON FOR TEACHER */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] text-white shadow-2xl border-2 border-teal-400/50 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-400/20 text-teal-400 border border-teal-400/40">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {editingLessonId ? 'Darsni Tahrirlash' : 'Yangi Dars Joylash (Ustoz)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Muallif: <b>{currentUser.name}</b>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-5 text-xs">
              {/* Field Selector */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Yoʻnalishni tanlang:</label>
                <select
                  value={targetFieldId}
                  onChange={(e) => setTargetFieldId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans focus:outline-none focus:border-teal-400"
                >
                  {fields.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.num}. {f.name} ({f.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Dars Sarlavhasi:</label>
                  <input
                    type="text"
                    required
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="masalan: Murobaha va Sherikchilik Qoidalari"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Davomiyligi:</label>
                  <input
                    type="text"
                    required
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    placeholder="masalan: 15 daq. video"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Video URL (optional) */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Video Dars Havolasi (YouTube / Video URL):</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... (ixtiyoriy)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Theory Content */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Nazariya & Audit Matni:</label>
                <textarea
                  rows={4}
                  required
                  value={lessonText}
                  onChange={(e) => setLessonText(e.target.value)}
                  placeholder="Darsning batafsil nazariy tushuntirishi, formulalar, qonuniyatlar va muallif tavsiyalari..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-400 resize-y"
                />
              </div>

              {/* Key Takeaways */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Asosiy Qoidalar (Har bir qator alohida qoida):</label>
                <textarea
                  rows={2}
                  value={lessonTakeaways}
                  onChange={(e) => setLessonTakeaways(e.target.value)}
                  placeholder="1. Muhim tamoyil&#10;2. Moliyaviy tahlil qoidasi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* Interactive Tool Selector */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Interaktiv Sandbox Kalkulyatori (ixtiyoriy):</label>
                <select
                  value={lessonTool || ''}
                  onChange={(e) => setLessonTool((e.target.value as Lesson['interactiveTool']) || undefined)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="">Hech qanday kalkulyatorsiz</option>
                  <option value="islamic_murabaha">Murobaha va Muzoraba Simulyatori</option>
                  <option value="zakat_calculator">Zakot Hisoblagichi</option>
                  <option value="demand_supply">Talab va Taklif Simulyatori</option>
                  <option value="compound_interest">Murakkab Foiz Kalkulyatori</option>
                  <option value="budget_50_30_20">50/30/20 Byudjet Taqsimoti</option>
                  <option value="balance_equation">Buxgalteriya Balans Tenglamasi</option>
                  <option value="break_even">Zararsizlik Nuqtasi (Break-Even)</option>
                </select>
              </div>

              {/* Practical Task */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Amaliy Audit Topshirigʻi (AI baholaydigan vazifa):</label>
                <textarea
                  rows={2}
                  required
                  value={lessonTask}
                  onChange={(e) => setLessonTask(e.target.value)}
                  placeholder="Oʻquvchi oʻz soʻzlari bilan yozishi kerak boʻlgan amaliy topshiriq sharti..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* Quiz 1 Form */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="font-mono-code text-teal-300 font-bold uppercase">Micro-Quiz #1:</div>
                <input
                  type="text"
                  required
                  placeholder="1-savol matni"
                  value={q1Question}
                  onChange={(e) => setQ1Question(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  {q1Options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      required
                      placeholder={`Variant ${String.fromCharCode(65 + idx)}`}
                      value={opt}
                      onChange={(e) => {
                        const copy = [...q1Options];
                        copy[idx] = e.target.value;
                        setQ1Options(copy);
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-slate-400">Toʻgʻri variant:</label>
                  <select
                    value={q1CorrectIdx}
                    onChange={(e) => setQ1CorrectIdx(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-teal-400 font-bold"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
              </div>

              {/* Quiz 2 Form */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="font-mono-code text-teal-300 font-bold uppercase">Micro-Quiz #2:</div>
                <input
                  type="text"
                  required
                  placeholder="2-savol matni"
                  value={q2Question}
                  onChange={(e) => setQ2Question(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  {q2Options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      required
                      placeholder={`Variant ${String.fromCharCode(65 + idx)}`}
                      value={opt}
                      onChange={(e) => {
                        const copy = [...q2Options];
                        copy[idx] = e.target.value;
                        setQ2Options(copy);
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-slate-400">Toʻgʻri variant:</label>
                  <select
                    value={q2CorrectIdx}
                    onChange={(e) => setQ2CorrectIdx(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-teal-400 font-bold"
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsLessonModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn-modern-primary py-2.5 px-6 font-mono-code font-bold cursor-pointer shadow-lg"
                >
                  💾 {editingLessonId ? 'Oʻzgarishlarni Saqlash' : 'Darsni Joylash (Eʼlon Qilish)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
