import React, { useState } from 'react';
import {
  AuthUser,
  Field,
  Lesson,
  MediaItem,
  ActivityLogItem,
  MicroQuiz,
  LessonPlanStep
} from '../types';
import { soundEffects } from '../utils/sound';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Video,
  Activity,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit3,
  PlusCircle,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  Layers,
  HelpCircle,
  FileText,
  Check,
  AlertTriangle,
  Eye,
  RefreshCw,
  UserPlus,
  Play,
  ExternalLink,
  Youtube
} from 'lucide-react';

interface AdminViewProps {
  currentUser: AuthUser;
  registeredUsers: AuthUser[];
  onAddNewTeacher?: (newTeacher: AuthUser) => void;
  onUpdateTeacherStatus: (userId: string, status: 'approved' | 'rejected') => void;
  onDeleteUser: (userId: string) => void;
  fields: Field[];
  onAddFieldLesson: (fieldId: string, newLesson: Lesson) => void;
  onUpdateFieldLesson: (fieldId: string, updatedLesson: Lesson) => void;
  onDeleteFieldLesson: (fieldId: string, lessonId: string) => void;
  mediaList: MediaItem[];
  onAddMediaItem: (newItem: MediaItem) => void;
  onDeleteMediaItem: (mediaId: string) => void;
  activityLogs: ActivityLogItem[];
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  currentUser,
  registeredUsers,
  onAddNewTeacher,
  onUpdateTeacherStatus,
  onDeleteUser,
  fields,
  onAddFieldLesson,
  onUpdateFieldLesson,
  onDeleteFieldLesson,
  mediaList,
  onAddMediaItem,
  onDeleteMediaItem,
  activityLogs,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'teachers' | 'lessons' | 'media' | 'analytics'>('teachers');
  const [teacherFilter, setTeacherFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [selectedFieldForContent, setSelectedFieldForContent] = useState<string>('iqtisodiyot');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. ADD NEW TEACHER MODAL STATE
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherPassword, setNewTeacherPassword] = useState('123');
  const [newTeacherSpecialty, setNewTeacherSpecialty] = useState('Islom Moliyasi va Tijorat huquqi');
  const [newTeacherExperience, setNewTeacherExperience] = useState('10 yillik amaliyot');
  const [newTeacherBio, setNewTeacherBio] = useState('Platformaning rasmiy ustozi va eksperti.');
  const [newTeacherFieldId, setNewTeacherFieldId] = useState('islom-moliyasi');
  const [newTeacherStatus, setNewTeacherStatus] = useState<'approved' | 'pending'>('approved');

  // 2. ACTIVE LESSON MODAL STATE (Add & Edit)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [targetFieldId, setTargetFieldId] = useState<string>('iqtisodiyot');

  // Lesson Form Fields
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState('12 daq. video');
  const [lessonYoutubeUrl, setLessonYoutubeUrl] = useState('');
  const [lessonText, setLessonText] = useState('');
  const [lessonTakeaways, setLessonTakeaways] = useState('');
  const [lessonTask, setLessonTask] = useState('');
  const [lessonTool, setLessonTool] = useState<Lesson['interactiveTool']>('demand_supply');

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

  // 3. VIDEO MEDIA MODAL STATE (Video Ta'lim)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaCategory, setMediaCategory] = useState('Moliya & Investitsiya');
  const [mediaDesc, setMediaDesc] = useState('');
  const [mediaDur, setMediaDur] = useState('15 daqiqa');
  const [mediaSpeaker, setMediaSpeaker] = useState('');
  const [mediaYoutubeUrl, setMediaYoutubeUrl] = useState('https://www.youtube.com/watch?v=HQzoZfc3GwQ');
  const [mediaQuizQuestion, setMediaQuizQuestion] = useState('');
  const [mediaQuizOptions, setMediaQuizOptions] = useState(['', '', '', '']);
  const [mediaQuizCorrectIdx, setMediaQuizCorrectIdx] = useState(0);
  const [mediaQuizExplanation, setMediaQuizExplanation] = useState('');
  const [mediaReward, setMediaReward] = useState(50);

  // Filtered teachers
  const teachers = registeredUsers.filter((u) => u.role === 'teacher');
  const pendingTeachers = teachers.filter((u) => u.teacherStatus === 'pending');
  const approvedTeachers = teachers.filter((u) => u.teacherStatus === 'approved');
  const students = registeredUsers.filter((u) => u.role === 'student');

  const displayedTeachers = teachers
    .filter((t) => {
      if (teacherFilter === 'pending') return t.teacherStatus === 'pending';
      if (teacherFilter === 'approved') return t.teacherStatus === 'approved';
      return true;
    })
    .filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.specialty && t.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const totalLessonsCount = fields.reduce((sum, f) => sum + f.lessons.length, 0);

  // ==========================================
  // HANDLERS: ADD TEACHER
  // ==========================================
  const handleOpenAddTeacher = () => {
    soundEffects.playClick();
    setNewTeacherName('');
    setNewTeacherEmail('');
    setNewTeacherPassword('123');
    setNewTeacherSpecialty('Islom Moliyasi va Biznes boshqaruvi');
    setNewTeacherExperience('5 yillik amaliyot');
    setNewTeacherBio('Platformaning rasmiy ustozi.');
    setNewTeacherFieldId('islom-moliyasi');
    setNewTeacherStatus('approved');
    setIsAddTeacherModalOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim() || !newTeacherEmail.trim()) return;

    const newTeacherObj: AuthUser = {
      id: `usr_tch_${Date.now()}`,
      name: newTeacherName.trim(),
      email: newTeacherEmail.trim().toLowerCase(),
      password: newTeacherPassword.trim() || '123',
      role: 'teacher',
      specialty: newTeacherSpecialty.trim(),
      experience: newTeacherExperience.trim(),
      bio: newTeacherBio.trim(),
      assignedFieldId: newTeacherFieldId,
      teacherStatus: newTeacherStatus,
      registeredDate: new Date().toLocaleDateString('uz-UZ')
    };

    if (onAddNewTeacher) {
      onAddNewTeacher(newTeacherObj);
    }
    soundEffects.playStamp();
    setIsAddTeacherModalOpen(false);
  };

  // ==========================================
  // HANDLERS: CREATE / EDIT LESSON
  // ==========================================
  const handleOpenCreateLesson = (fieldId: string) => {
    soundEffects.playClick();
    setEditingLessonId(null);
    setTargetFieldId(fieldId);
    setLessonTitle('');
    setLessonDuration('12 daq. video');
    setLessonYoutubeUrl('');
    setLessonText('');
    setLessonTakeaways('1. Asosiy tushuncha va formulaviy qoida\n2. Bozor holati tahlili\n3. Amaliy xulosa va tavsiyalar');
    setLessonTask('Oʻrganilgan mavzu boʻyicha amaliy misol keltirib, oʻz mustaqil tahlilingizni yozing.');
    setLessonTool(fieldId === 'islom-moliyasi' ? 'islamic_murabaha' : 'demand_supply');

    setQ1Question('Darsda koʻrib chiqilgan asosiy moliyaviy qoida qanday?');
    setQ1Options(['Kapitalni toʻgʻri taqsimlash va hisob-kitob qilish', 'Xarajatlarni nazoratsiz oshirish', 'Faqat tavakkalchilikka tayanish', 'Resurslarni tejashdan bosh tortish']);
    setQ1CorrectIdx(0);
    setQ1Explanation('Moliyaviy intizom va asosli hisob-kitob muvaffaqiyat garovidir.');

    setQ2Question('Ushbu holatda xato tahlil qanday oqibatga olib keladi?');
    setQ2Options(['Moliyaviy zarar va yoʻqotishga', 'Daromadning avtomatik koʻpayishiga', 'Hech qanday taʼsir koʻrsatmaydi', 'Kompaniya xarajatlari kamayishiga']);
    setQ2CorrectIdx(0);
    setQ2Explanation('Xato koʻrsatkichlar notoʻgʻri strategik qarorlarga sabab boʻladi.');

    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (fieldId: string, lesson: Lesson) => {
    soundEffects.playClick();
    setEditingLessonId(lesson.id);
    setTargetFieldId(fieldId);
    setLessonTitle(lesson.title);
    setLessonDuration(lesson.dur);
    setLessonYoutubeUrl(lesson.youtubeUrl || lesson.videoPlaceholderUrl || '');
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
      explanation: q1Explanation.trim() || 'Toʻgʻri javob izohi.'
    };

    const q2: MicroQuiz = {
      id: `q2_${Date.now()}`,
      question: q2Question.trim() || 'Test savoli #2',
      options: q2Options.map((o, idx) => o.trim() || `Variant ${idx + 1}`),
      correctIndex: q2CorrectIdx,
      explanation: q2Explanation.trim() || 'Toʻgʻri javob izohi.'
    };

    const rejaSteps: LessonPlanStep[] = [
      {
        id: `s1_${Date.now()}`,
        order: 1,
        title: '1. Nazariy asoslar va tushunchalar',
        timeEst: '3 daq.',
        category: 'nazariya',
        description: 'Mavzuning poydevor tushunchalari va nazariy qoidalari.'
      },
      {
        id: `s2_${Date.now()}`,
        order: 2,
        title: '2. Formulalar va Moliyaviy Sandbox',
        timeEst: '3 daq.',
        category: 'formula',
        description: 'Jonli hisob-kitoblar va interaktiv formulaviy vosita.'
      },
      {
        id: `s3_${Date.now()}`,
        order: 3,
        title: '3. Real Keyslar va Amaliy Misollar',
        timeEst: '2 daq.',
        category: 'keys',
        description: 'Bozor va kompaniyalarning real holatlari tahlili.'
      },
      {
        id: `s4_${Date.now()}`,
        order: 4,
        title: '4. Nazorat Testi (Micro-Quiz)',
        timeEst: '2 daq.',
        category: 'quiz',
        description: 'Oʻzlashtirish darajasini aniqlovchi 2 ta ekspress test.'
      },
      {
        id: `s5_${Date.now()}`,
        order: 5,
        title: '5. Mustaqil Audit va AI Baholash',
        timeEst: '5 daq.',
        category: 'audit',
        description: 'Mustaqil yozma tahlil va AI ekspert xulosasi.'
      }
    ];

    const cleanYoutube = lessonYoutubeUrl.trim() || undefined;

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

  // ==========================================
  // HANDLERS: VIDEO MEDIA CREATION (PASSIV TA'LIM)
  // ==========================================
  const handleOpenAddMedia = () => {
    soundEffects.playClick();
    setMediaTitle('');
    setMediaCategory('Moliya & Investitsiya');
    setMediaDesc('');
    setMediaDur('15 daqiqa');
    setMediaSpeaker('');
    setMediaYoutubeUrl('https://www.youtube.com/watch?v=HQzoZfc3GwQ');
    setMediaQuizQuestion('Ushbu videodarsda aytilgan asosiy xulosa nima?');
    setMediaQuizOptions(['Moliyaviy intizom va muntazam tahlil', 'Tasodifiy tavakkalchilik', 'Hech qanday rejasiz ish boshlash', 'Barcha xarajatlarni oshirish']);
    setMediaQuizCorrectIdx(0);
    setMediaQuizExplanation('Videodarsda moliyaviy barqarorlikning asosi sifatida aniq reja va doimiy nazorat koʻrsatildi.');
    setMediaReward(50);
    setIsMediaModalOpen(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim()) return;

    const newMedia: MediaItem = {
      id: `m_vid_${Date.now()}`,
      kind: 'Video',
      title: mediaTitle.trim(),
      desc: mediaDesc.trim() || 'Video darslik tavsifi.',
      duration: mediaDur.trim() || '15 daqiqa',
      speaker: mediaSpeaker.trim() || 'Platforma Ustozi',
      youtubeUrl: mediaYoutubeUrl.trim() || 'https://www.youtube.com/watch?v=HQzoZfc3GwQ',
      videoCategory: mediaCategory,
      audioQuiz: {
        question: mediaQuizQuestion.trim() || 'Video boʻyicha savol',
        options: mediaQuizOptions.map((o, idx) => o.trim() || `Variant ${idx + 1}`),
        correctIndex: mediaQuizCorrectIdx,
        explanation: mediaQuizExplanation.trim() || 'Toʻgʻri tushuntirish.',
        rewardCapital: mediaReward || 50
      },
      videoQuiz: {
        question: mediaQuizQuestion.trim() || 'Video boʻyicha savol',
        options: mediaQuizOptions.map((o, idx) => o.trim() || `Variant ${idx + 1}`),
        correctIndex: mediaQuizCorrectIdx,
        explanation: mediaQuizExplanation.trim() || 'Toʻgʻri tushuntirish.',
        rewardCapital: mediaReward || 50
      },
      createdAt: new Date().toLocaleDateString('uz-UZ')
    };

    onAddMediaItem(newMedia);
    soundEffects.playStamp();
    setIsMediaModalOpen(false);
  };

  const activeField = fields.find((f) => f.id === selectedFieldForContent) || fields[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-slate-900 border-2 border-rose-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono-code font-bold">
            <ShieldCheck className="w-4 h-4" /> BOSH ADMIN & KONTENT BOSHQARUVI
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Admin Boshqaruv Portali
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Ustozlarni qabul qilish/oʻchirish, yangi ustoz qoʻshish, 5 ta yoʻnalish boʻyicha YouTube darslarini joylash va passiv video-taʼlim kontentini boshqarish markazi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleOpenAddTeacher}
            className="btn-modern-primary py-3 px-5 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-500/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>➕ Yangi Ustoz Qoʻshish</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Ustozlar Soni</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-white">
            {teachers.length}
          </div>
          <div className="text-[11px] text-teal-300 font-mono-code">
            {approvedTeachers.length} tasdiqlangan, {pendingTeachers.length} kutilmoqda
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Faol Darslar (5 Soha)</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-amber-400">
            {totalLessonsCount}
          </div>
          <div className="text-[11px] text-amber-300/80 font-mono-code">YouTube video + AI audit</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Video Taʼlim (Passiv)</span>
            <Video className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-cyan-400">
            {mediaList.length}
          </div>
          <div className="text-[11px] text-cyan-300/80 font-mono-code">YouTube videodarslar</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-1 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono-code">
            <span>Oʻquvchilar</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {students.length}
          </div>
          <div className="text-[11px] text-emerald-300/80 font-mono-code">Faol taʼlim oluvchilar</div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('teachers');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'teachers'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Ustozlar Boshqaruvi ({teachers.length})</span>
          {pendingTeachers.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
              {pendingTeachers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('lessons');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'lessons'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Faol Darslar (5 Yoʻnalish) ({totalLessonsCount})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('media');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'media'
              ? 'bg-cyan-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Video Taʼlim (Passiv) ({mediaList.length})</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('analytics');
          }}
          className={`py-2 px-4 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer font-bold ${
            activeTab === 'analytics'
              ? 'bg-emerald-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Jonli Monitoring ({activityLogs.length})</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: TEACHER MANAGEMENT */}
      {/* ==================================================================== */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setTeacherFilter('all')}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono-code cursor-pointer font-bold transition-all ${
                  teacherFilter === 'all'
                    ? 'bg-white text-slate-950'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Barchasi ({teachers.length})
              </button>
              <button
                onClick={() => setTeacherFilter('pending')}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono-code cursor-pointer font-bold transition-all flex items-center gap-1.5 ${
                  teacherFilter === 'pending'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-900 text-amber-300 border border-amber-400/30'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Kutilmoqda ({pendingTeachers.length})</span>
              </button>
              <button
                onClick={() => setTeacherFilter('approved')}
                className={`py-1.5 px-3 rounded-lg text-xs font-mono-code cursor-pointer font-bold transition-all flex items-center gap-1.5 ${
                  teacherFilter === 'approved'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-slate-900 text-emerald-300 border border-emerald-400/30'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tasdiqlangan ({approvedTeachers.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ustoz ismi, email yoki soha..."
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500 w-56 sm:w-64"
                />
              </div>

              <button
                onClick={handleOpenAddTeacher}
                className="btn-modern-primary py-2 px-3.5 text-xs font-bold font-mono-code flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Ustoz Qoʻshish</span>
              </button>
            </div>
          </div>

          {displayedTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedTeachers.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-400/15 border border-teal-400/30 text-teal-300 text-xl font-bold font-display flex items-center justify-center">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                            {t.name}
                          </h4>
                          <p className="text-xs font-mono-code text-slate-400">{t.email}</p>
                        </div>
                      </div>

                      {t.teacherStatus === 'approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono-code font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Faol Ustoz
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono-code font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Kutilmoqda
                        </span>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Mutaxassislik:</span>
                        <span className="text-teal-300 font-semibold">{t.specialty || 'Moliya ustozi'}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Tajriba:</span>
                        <span className="text-slate-200">{t.experience || 'Amaliyotchi'}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Roʻyxatdan oʻtgan:</span>
                        <span className="text-slate-300 font-mono-code">{t.registeredDate}</span>
                      </div>
                    </div>

                    {t.bio && (
                      <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
                        &quot;{t.bio}&quot;
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (window.confirm(`Haqiqatan ham ${t.name} ustozini tizimdan butunlay oʻchirmoqchimisiz?`)) {
                          soundEffects.playClick();
                          onDeleteUser(t.id);
                        }
                      }}
                      className="py-1.5 px-3 rounded-lg border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Oʻchirish
                    </button>

                    <div className="flex items-center gap-2">
                      {t.teacherStatus === 'pending' ? (
                        <>
                          <button
                            onClick={() => {
                              soundEffects.playSuccess();
                              onUpdateTeacherStatus(t.id, 'rejected');
                            }}
                            className="py-1.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-mono-code cursor-pointer"
                          >
                            Rad etish
                          </button>
                          <button
                            onClick={() => {
                              soundEffects.playStamp();
                              onUpdateTeacherStatus(t.id, 'approved');
                            }}
                            className="btn-modern-primary py-1.5 px-4 text-xs font-bold font-mono-code flex items-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Check className="w-3.5 h-3.5" /> Tasdiqlash
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            soundEffects.playClick();
                            onUpdateTeacherStatus(t.id, 'rejected');
                          }}
                          className="py-1.5 px-3 rounded-lg border border-amber-500/30 text-amber-300 hover:bg-amber-950/40 text-xs font-mono-code cursor-pointer"
                        >
                          Maqomni toʻxtatish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#111a2e] rounded-3xl border border-slate-800 space-y-4">
              <Users className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400 font-mono-code">
                Bunday mezon boʻyicha oʻqituvchilar topilmadi.
              </p>
              <button
                onClick={handleOpenAddTeacher}
                className="btn-modern-primary py-2 px-4 text-xs font-bold font-mono-code inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Yangi Ustoz Qoʻshish</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: ACTIVE LESSONS MANAGEMENT (5 FIELDS + YOUTUBE LINKS) */}
      {/* ==================================================================== */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Field Selection Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {fields.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedFieldForContent(f.id);
                }}
                className={`py-2 px-3.5 rounded-xl text-xs font-mono-code transition-all cursor-pointer font-bold flex items-center gap-2 ${
                  selectedFieldForContent === f.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{f.num}.</span>
                <span>{f.name}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-950/40 text-[10px]">
                  {f.lessons.length} ta dars
                </span>
              </button>
            ))}
          </div>

          {/* Header of selected field */}
          <div className="p-6 rounded-3xl bg-[#111a2e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="text-xs font-mono-code text-amber-400 font-bold">
                {activeField.num}. {activeField.tag}
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white">
                {activeField.name} boʻyicha darslar ({activeField.lessons.length} ta)
              </h3>
              <p className="text-xs text-slate-400">{activeField.desc}</p>
            </div>

            <button
              onClick={() => handleOpenCreateLesson(activeField.id)}
              className="btn-modern-primary py-3 px-5 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yangi Dars Qoʻshish</span>
            </button>
          </div>

          {/* List of lessons in field */}
          <div className="space-y-3">
            {activeField.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono-code font-bold flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-display text-base font-bold text-white">
                        {lesson.title}
                      </h4>
                      {(lesson.youtubeUrl || lesson.videoPlaceholderUrl) && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono-code font-bold flex items-center gap-1">
                          <Youtube className="w-3 h-3 text-rose-400" /> YouTube Video
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400 flex-wrap">
                      <span className="text-amber-400">⏱️ {lesson.dur}</span>
                      <span>•</span>
                      <span>📋 {lesson.reja?.length || 5} bosqich</span>
                      <span>•</span>
                      <span>❓ 2 ta Quiz</span>
                      {lesson.authorTeacher && (
                        <>
                          <span>•</span>
                          <span className="text-teal-300">👤 {lesson.authorTeacher}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEditLesson(activeField.id, lesson)}
                    className="py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono-code hover:text-amber-300 hover:border-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Tahrirlash
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onNavigate('lesson', activeField.id, lesson.id);
                    }}
                    className="py-2 px-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono-code hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Koʻrish
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`"${lesson.title}" darsini platformadan butunlay oʻchirmoqchimisiz?`)) {
                        soundEffects.playClick();
                        onDeleteFieldLesson(activeField.id, lesson.id);
                      }
                    }}
                    className="py-2 px-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-mono-code hover:bg-rose-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Darsni oʻchirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: VIDEO TA'LIM MANAGEMENT (PASSIV VIDEO DARSLAR) */}
      {/* ==================================================================== */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Passiv Video Taʼlim & Masterklasslar ({mediaList.length} ta)
              </h3>
              <p className="text-xs text-slate-400">
                Oʻquvchilar ushbu YouTube videolarni tomosha qiladi, video-quizni yechadi va bonus kapital ishlab oladi.
              </p>
            </div>

            <button
              onClick={handleOpenAddMedia}
              className="btn-modern-primary py-3 px-5 text-xs font-bold font-mono-code flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>➕ Yangi Video Dars Qoʻshish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediaList.map((media) => {
              const ytThumb = getYouTubeThumbnail(media.youtubeUrl);
              return (
                <div
                  key={media.id}
                  className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-3 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all"
                >
                  <div className="space-y-3">
                    {/* Video Thumbnail Preview */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group">
                      <img
                        src={ytThumb}
                        alt={media.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 justify-between">
                        <span className="px-2 py-1 rounded-md bg-slate-950/80 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono-code font-bold flex items-center gap-1">
                          <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" /> {media.duration}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-amber-400 text-slate-950 text-[10px] font-mono-code font-bold">
                          +{media.audioQuiz?.rewardCapital || 50} Kapital
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono-code font-bold">
                          {media.videoCategory || 'Video Dars'}
                        </span>
                        {media.speaker && (
                          <span className="text-xs font-mono-code text-slate-400 truncate">
                            👤 {media.speaker}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-base font-bold text-white line-clamp-1">
                        {media.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {media.desc}
                      </p>
                    </div>

                    {media.youtubeUrl && (
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] font-mono-code text-rose-300 flex items-center gap-1.5 truncate">
                        <Youtube className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                        <span className="truncate">{media.youtubeUrl}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        onNavigate('passive');
                      }}
                      className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Videoni koʻrish</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`"${media.title}" video darsini oʻchirmoqchimisiz?`)) {
                          soundEffects.playClick();
                          onDeleteMediaItem(media.id);
                        }
                      }}
                      className="py-1.5 px-3 rounded-lg border border-rose-500/30 bg-rose-950/20 text-rose-300 hover:bg-rose-950/50 text-xs font-mono-code flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Oʻchirish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: LIVE MONITORING & ACTIVITY LOG */}
      {/* ==================================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Jonli Monitoring & Harakatlar Jurnali ({activityLogs.length} ta)
            </h3>
            <p className="text-xs text-slate-400">
              Platformadagi barcha tizim oʻzgarishlari, ustoz arizalari, yangi darslar va AI audit natijalari.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111a2e] border border-slate-800 space-y-4 shadow-xl">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-bold uppercase ${
                        log.type === 'teacher'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : log.type === 'audit'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {log.type}
                    </span>
                    <span className="font-display text-xs font-bold text-white">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{log.details}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] font-mono-code text-slate-400">{log.timestamp}</div>
                  {log.actorName && (
                    <div className="text-[10px] font-mono-code text-slate-300 font-semibold">
                      👤 {log.actorName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 1: ADD NEW TEACHER */}
      {/* ==================================================================== */}
      {isAddTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] text-white shadow-2xl border-2 border-rose-500/50 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Yangi Ustoz Qoʻshish
                  </h3>
                  <p className="text-xs text-slate-400">
                    Administrator tomonidan ustozni toʻgʻridan-toʻgʻri roʻyxatdan oʻtkazish
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddTeacherModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Ism va Familiyasi:</label>
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="masalan: Muhammadali Eshonqulov"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Email manzili:</label>
                  <input
                    type="email"
                    required
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    placeholder="ustoz@moliya.uz"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Parol:</label>
                  <input
                    type="text"
                    required
                    value={newTeacherPassword}
                    onChange={(e) => setNewTeacherPassword(e.target.value)}
                    placeholder="123"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500 font-mono-code"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Mutaxassislik yoʻnalishi:</label>
                <input
                  type="text"
                  required
                  value={newTeacherSpecialty}
                  onChange={(e) => setNewTeacherSpecialty(e.target.value)}
                  placeholder="masalan: Islom Moliyasi, Buxgalteriya, Audit"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Tajriba darajasi:</label>
                  <input
                    type="text"
                    value={newTeacherExperience}
                    onChange={(e) => setNewTeacherExperience(e.target.value)}
                    placeholder="masalan: 10 yillik tajriba"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Biriktirilgan Soha:</label>
                  <select
                    value={newTeacherFieldId}
                    onChange={(e) => setNewTeacherFieldId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    {fields.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.num}. {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Qisqacha maʼlumot (Bio):</label>
                <textarea
                  rows={2}
                  value={newTeacherBio}
                  onChange={(e) => setNewTeacherBio(e.target.value)}
                  placeholder="Ustoz haqida qisqacha tavsif..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Ustozlik Maqomi:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTeacherStatus('approved')}
                    className={`py-2 px-3 rounded-xl border text-center font-mono-code font-bold transition-all cursor-pointer ${
                      newTeacherStatus === 'approved'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ✓ Darhol Tasdiqlash
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTeacherStatus('pending')}
                    className={`py-2 px-3 rounded-xl border text-center font-mono-code font-bold transition-all cursor-pointer ${
                      newTeacherStatus === 'pending'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⏳ Kutilmoqda
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn-modern-primary py-2.5 px-6 font-mono-code font-bold cursor-pointer shadow-lg"
                >
                  💾 Ustozni Qoʻshish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: CREATE / EDIT ACTIVE LESSON WITH YOUTUBE LINK */}
      {/* ==================================================================== */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] text-white shadow-2xl border-2 border-amber-400/50 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/40">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {editingLessonId ? 'Darsni Tahrirlash' : 'Yangi Dars Qoʻshish (Admin)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    YouTube video havolasi, nazariya, 2 ta test va AI audit topshirigʻi
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
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Yoʻnalishni tanlang:</label>
                <select
                  value={targetFieldId}
                  onChange={(e) => setTargetFieldId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-sans focus:outline-none focus:border-amber-400"
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
                    placeholder="masalan: Talab va Taklif Mexanizmi"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Davomiyligi:</label>
                  <input
                    type="text"
                    required
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    placeholder="masalan: 12 daq. video"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* YouTube Link Field */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                <label className="font-mono-code text-rose-300 font-bold flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span>YouTube Video Dars Linki (URL):</span>
                </label>
                <input
                  type="text"
                  value={lessonYoutubeUrl}
                  onChange={(e) => setLessonYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=HQzoZfc3GwQ"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400 font-mono-code"
                />
                <p className="text-[11px] text-slate-400">
                  Ushbu dars sahifasida YouTube video player toʻgʻridan-toʻgʻri oʻrnatiladi.
                </p>
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 resize-y"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Interactive Tool Selector */}
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Interaktiv Sandbox Kalkulyatori (ixtiyoriy):</label>
                <select
                  value={lessonTool || ''}
                  onChange={(e) => setLessonTool((e.target.value as Lesson['interactiveTool']) || undefined)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Hech qanday kalkulyatorsiz</option>
                  <option value="demand_supply">Talab va Taklif Simulyatori</option>
                  <option value="islamic_murabaha">Murobaha va Muzoraba Simulyatori</option>
                  <option value="zakat_calculator">Zakot Hisoblagichi</option>
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Quiz 1 Form */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="font-mono-code text-amber-300 font-bold uppercase">Micro-Quiz #1:</div>
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
                    className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-amber-400 font-bold"
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
                <div className="font-mono-code text-amber-300 font-bold uppercase">Micro-Quiz #2:</div>
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
                    className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-amber-400 font-bold"
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
                  💾 {editingLessonId ? 'Oʻzgarishlarni Saqlash' : 'Darsni Saqlash & Eʼlon Qilish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: ADD PASSIVE VIDEO CONTENT (PASSIV VIDEO DARSLAR) */}
      {/* ==================================================================== */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] to-[#0a0f1d] text-white shadow-2xl border-2 border-cyan-400/50 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-400/20 text-cyan-400 border border-cyan-400/40">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Yangi Video Dars Qoʻshish
                  </h3>
                  <p className="text-xs text-slate-400">
                    YouTube video havolasi va video-quiz orqali passiv taʼlim kontenti
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Video Sarlavhasi:</label>
                <input
                  type="text"
                  required
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="masalan: Islomiy moliya va biznes etikasi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Soha / Kategoriya:</label>
                  <input
                    type="text"
                    required
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    placeholder="masalan: Islom Moliyasi, Investitsiya"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Spiker / Muallif:</label>
                  <input
                    type="text"
                    value={mediaSpeaker}
                    onChange={(e) => setMediaSpeaker(e.target.value)}
                    placeholder="masalan: Muhammadali Eshonqulov"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* YouTube URL */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                <label className="font-mono-code text-rose-300 font-bold flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span>YouTube Video Linki (URL):</span>
                </label>
                <input
                  type="text"
                  required
                  value={mediaYoutubeUrl}
                  onChange={(e) => setMediaYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=e_wKk_i8KzI"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400 font-mono-code"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Davomiyligi:</label>
                  <input
                    type="text"
                    required
                    value={mediaDur}
                    onChange={(e) => setMediaDur(e.target.value)}
                    placeholder="masalan: 18 daqiqa"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-code text-slate-300 font-bold">Mukofot Kapitali (+soʻm):</label>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={mediaReward}
                    onChange={(e) => setMediaReward(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-bold focus:outline-none focus:border-cyan-400 font-mono-code"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-code text-slate-300 font-bold">Video Tavsifi:</label>
                <textarea
                  rows={2}
                  value={mediaDesc}
                  onChange={(e) => setMediaDesc(e.target.value)}
                  placeholder="Videoda nimalar oʻrganilishi haqida qisqacha..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Video Quiz Section */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="font-mono-code text-cyan-300 font-bold uppercase flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Video-Quiz Savoli:
                </div>
                <input
                  type="text"
                  required
                  placeholder="Videodars boʻyicha nazorat savoli"
                  value={mediaQuizQuestion}
                  onChange={(e) => setMediaQuizQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  {mediaQuizOptions.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      required
                      placeholder={`Variant ${String.fromCharCode(65 + idx)}`}
                      value={opt}
                      onChange={(e) => {
                        const copy = [...mediaQuizOptions];
                        copy[idx] = e.target.value;
                        setMediaQuizOptions(copy);
                      }}
                      className="bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-slate-400">Toʻgʻri variant:</label>
                  <select
                    value={mediaQuizCorrectIdx}
                    onChange={(e) => setMediaQuizCorrectIdx(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-cyan-400 font-bold"
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
                  onClick={() => setIsMediaModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn-modern-primary py-2.5 px-6 font-mono-code font-bold cursor-pointer shadow-lg"
                >
                  💾 Video Darsni Eʼlon Qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
