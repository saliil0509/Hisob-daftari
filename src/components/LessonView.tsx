import React, { useState } from 'react';
import { Field, Lesson, LessonProgress, LessonPlanStep } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock,
  Send,
  HelpCircle,
  FileText,
  Bookmark,
  CheckSquare,
  Square,
  Clock,
  Layers,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { evaluateHomework } from '../utils/aiChecker';
import { StampSuccessModal } from './StampSuccessModal';
import { InteractiveCalculator } from './InteractiveCalculator';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../utils/youtube';

interface LessonViewProps {
  field: Field;
  lesson: Lesson;
  progress: LessonProgress;
  onSaveProgress: (fieldId: string, lessonId: string, updated: Partial<LessonProgress>) => void;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
  allFields: Field[];
}

export const LessonView: React.FC<LessonViewProps> = ({
  field,
  lesson,
  progress,
  onSaveProgress,
  onNavigate,
  allFields: _allFields
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [quizId: string]: number }>(
    progress.quizAnswers || {}
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(progress.quizPassed || false);
  const [answerText, setAnswerText] = useState<string>(progress.answer || '');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showStampModal, setShowStampModal] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'sandbox' | 'quiz' | 'audit'>('content');
  const [completedSteps, setCompletedSteps] = useState<string[]>(
    progress.completedSteps || (progress.completed ? ['s1', 's2', 's3', 's4', 's5'] : [])
  );

  // Check if both quizzes are answered correctly
  const q1 = lesson.quizzes[0];
  const q2 = lesson.quizzes[1];

  const isQ1Correct = selectedAnswers[q1.id] === q1.correctIndex;
  const isQ2Correct = selectedAnswers[q2.id] === q2.correctIndex;
  const bothQuizzesCorrect = isQ1Correct && isQ2Correct;

  const toggleStep = (stepId: string) => {
    soundEffects.playClick();
    const updated = completedSteps.includes(stepId)
      ? completedSteps.filter((id) => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(updated);
    onSaveProgress(field.id, lesson.id, { completedSteps: updated });
  };

  const handleSelectQuiz = (quizId: string, optionIdx: number) => {
    soundEffects.playClick();
    const updated = { ...selectedAnswers, [quizId]: optionIdx };
    setSelectedAnswers(updated);

    const q1Pass = updated[q1.id] === q1.correctIndex;
    const q2Pass = updated[q2.id] === q2.correctIndex;

    if (q1Pass && q2Pass) {
      soundEffects.playSuccess();
      setQuizSubmitted(true);
      onSaveProgress(field.id, lesson.id, {
        quizPassed: true,
        quizAnswers: updated
      });
    } else {
      onSaveProgress(field.id, lesson.id, {
        quizPassed: false,
        quizAnswers: updated
      });
    }
  };

  const handleCheckHomework = async () => {
    if (!answerText.trim()) {
      setErrorMessage('Iltimos, amaliy topshiriq boʻyicha javobingizni yozing.');
      return;
    }
    if (answerText.trim().length < 15) {
      setErrorMessage('Javobingiz juda qisqa. Kamida 2-3 jumlada batafsil tushuntirib bering.');
      return;
    }

    setErrorMessage('');
    setIsChecking(true);
    soundEffects.playClick();

    try {
      const result = await evaluateHomework(field.name, lesson, answerText);
      const updated: Partial<LessonProgress> = {
        completed: true,
        answer: answerText,
        aiScore: result.score,
        aiFeedback: result.feedback,
        criteria: result.criteria,
        auditedAt: new Date().toLocaleDateString('uz-UZ'),
        completedSteps: lesson.reja ? lesson.reja.map((s) => s.id) : ['s1', 's2', 's3', 's4', 's5']
      };

      setCompletedSteps(updated.completedSteps || []);
      onSaveProgress(field.id, lesson.id, updated);
      soundEffects.playStamp();
      setShowStampModal(true);
    } catch (e: unknown) {
      console.error(e);
      setErrorMessage('AI baholash tizimida xatolik yuz berdi. Iltimos, qayta urinib koʻring.');
    } finally {
      setIsChecking(false);
    }
  };

  // Sibling navigation
  const currentIdx = field.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = field.lessons[currentIdx + 1];
  const prevLesson = field.lessons[currentIdx - 1];

  const planSteps: LessonPlanStep[] =
    lesson.reja || [
      {
        id: 's1',
        order: 1,
        title: '1. Nazariy asoslar va tushunchalar',
        timeEst: '3 daq.',
        category: 'nazariya',
        description: 'Mavzu boʻyicha asosiy iqtisodiy qonuniyatlar va taʼriflar.'
      },
      {
        id: 's2',
        order: 2,
        title: '2. Formulalar va Moliyaviy Sandbox',
        timeEst: '3 daq.',
        category: 'formula',
        description: 'Jonli hisob-kitoblar va formulaviy bogʻliqliklar tahlili.'
      },
      {
        id: 's3',
        order: 3,
        title: '3. Real Keyslar va Amaliy Misollar',
        timeEst: '2 daq.',
        category: 'keys',
        description: 'Bozor va korxona tajribasidan olingan holatlar tahlili.'
      },
      {
        id: 's4',
        order: 4,
        title: '4. Nazorat Testi (Micro-Quiz)',
        timeEst: '2 daq.',
        category: 'quiz',
        description: 'Bilimni mustahkamlash uchun 2 ta ekspress test.'
      },
      {
        id: 's5',
        order: 5,
        title: '5. Mustaqil Audit va AI Baholash',
        timeEst: '5 daq.',
        category: 'audit',
        description: 'Yozma amaliy vazifa va AI auditor ekspert xulosasi.'
      }
    ];

  const totalPlanSteps = planSteps.length;
  const completedPlanCount = planSteps.filter((s) => completedSteps.includes(s.id)).length;
  const planPercent = Math.round((completedPlanCount / (totalPlanSteps || 1)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 relative">
      {/* Top Bar with Breadcrumbs and Quick Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('field', field.id);
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-code text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> {field.name} darslariga qaytish
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Reja Progress Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-400/30 text-xs font-mono-code text-amber-400 shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Reja: {completedPlanCount}/{totalPlanSteps} bosqich ({planPercent}%)</span>
          </div>

          <div className="text-xs font-mono-code text-slate-200 font-bold px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
            {field.tag} • DARS 0{currentIdx + 1}
          </div>
        </div>
      </div>

      {/* Dars Rejasi (Interactive Syllabus Header Roadmap) */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#111a2e] border border-amber-400/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-xl text-amber-400 shadow-inner">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code text-amber-400 uppercase tracking-wider font-bold">
                  DARSNING STRUKTURAVIY REJASI (SYLLABUS)
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  ⏱️ Jami ~15 daqiqa
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                {lesson.title}
              </h3>
            </div>
          </div>

          {/* Quick tab filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('content');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📖 Nazariya & Video
            </button>
            {lesson.interactiveTool && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('sandbox');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                  activeTab === 'sandbox'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚙️ Sandbox
              </button>
            )}
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('quiz');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ❓ 2 ta Quiz {bothQuizzesCorrect && '✓'}
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('audit');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🖋️ AI Audit {progress.completed && '★'}
            </button>
          </div>
        </div>

        {/* 5-Step interactive roadmap tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
          {planSteps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 select-none ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-code">
                  <span className="font-bold">0{idx + 1}-bosqich</span>
                  <span className={isDone ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {step.timeEst}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {step.title.replace(/^\d+\.\s*/, '')}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono-code font-bold">
                  {isDone ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Bajarildi
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Square className="w-3 h-3" /> Oʻrganilmoqda
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Study Content (8 cols) vs Side Sibling Navigation (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Lesson Body & Tools (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Video Player Card with YouTube Embed */}
          {(activeTab === 'content' || activeTab === 'audit' || activeTab === 'sandbox' || activeTab === 'quiz') && (
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video shadow-2xl">
              {isPlayingVideo || lesson.youtubeUrl ? (
                <iframe
                  src={getYouTubeEmbedUrl(lesson.youtubeUrl || lesson.videoPlaceholderUrl)}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 group relative">
                  <img
                    src={getYouTubeThumbnail(lesson.youtubeUrl || lesson.videoPlaceholderUrl)}
                    alt={lesson.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setIsPlayingVideo(true);
                    }}
                    className="relative z-10 w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-all cursor-pointer"
                  >
                    <Play className="w-7 h-7 fill-slate-950 ml-1" />
                  </button>
                  <div className="relative z-10 mt-4 space-y-1">
                    <span className="text-[11px] font-mono-code uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 border border-amber-400/30">
                      ⏱️ {lesson.dur} • YouTube Video Darslik
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      {lesson.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 1: Theory Material & Key Takeaways */}
          {(activeTab === 'content' || activeTab === 'audit') && (
            <div className="rounded-2xl p-6 sm:p-9 bg-[#111a2e] text-slate-100 shadow-xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono-code text-xs uppercase tracking-widest text-amber-400 font-bold">
                  AUDIT QOʻLLANMASI VA NAZARIYA
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  {lesson.dur}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {lesson.title}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {lesson.text}
              </p>

              {lesson.keyTakeaways && (
                <div className="mt-6 p-5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    ASOSIY QOIDALAR VA MAZMUN:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                    {lesson.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Interactive Financial Sandbox */}
          {(activeTab === 'sandbox' || activeTab === 'content') && lesson.interactiveTool && (
            <InteractiveCalculator toolType={lesson.interactiveTool} />
          )}

          {/* Tab 3: Micro-Quizzes (2 ta) */}
          {(activeTab === 'quiz' || activeTab === 'content' || activeTab === 'audit') && (
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-400/15 text-amber-400 border border-amber-400/30">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Micro-Quiz (2 ta ekspress test)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Amaliy topshiriq qulfini ochish uchun ikkala savolga toʻgʻri javob bering
                    </p>
                  </div>
                </div>

                <div className="font-mono-code text-xs font-bold">
                  {bothQuizzesCorrect ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> TESTDAN OʻTILDİ
                    </span>
                  ) : (
                    <span className="text-amber-400">
                      {(isQ1Correct ? 1 : 0) + (isQ2Correct ? 1 : 0)} / 2 TOʻGʻRI
                    </span>
                  )}
                </div>
              </div>

              {/* Quiz 1 */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-mono-code text-amber-400 uppercase font-bold">
                    TEST #1:
                  </div>
                  {isQ1Correct && (
                    <span className="text-[11px] font-mono-code text-emerald-400 font-bold">
                      ✓ TOʻGʻRI
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-200 font-semibold">
                  {q1.question}
                </p>
                <div className="space-y-2">
                  {q1.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q1.id] === optIdx;
                    let style = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';
                    if (isSelected) {
                      style =
                        optIdx === q1.correctIndex
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold ring-1 ring-emerald-500'
                          : 'border-rose-500 bg-rose-950/40 text-rose-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuiz(q1.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl text-xs border transition-all flex items-start gap-2.5 cursor-pointer ${style}`}
                      >
                        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="mt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAnswers[q1.id] !== undefined && (
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      isQ1Correct
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950/40 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isQ1Correct ? `✓ ${q1.explanation}` : `✕ Notoʻgʻri. Qaytadan urinib koʻring.`}
                  </div>
                )}
              </div>

              {/* Quiz 2 */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-mono-code text-amber-400 uppercase font-bold">
                    TEST #2:
                  </div>
                  {isQ2Correct && (
                    <span className="text-[11px] font-mono-code text-emerald-400 font-bold">
                      ✓ TOʻGʻRI
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-200 font-semibold">
                  {q2.question}
                </p>
                <div className="space-y-2">
                  {q2.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q2.id] === optIdx;
                    let style = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';
                    if (isSelected) {
                      style =
                        optIdx === q2.correctIndex
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold ring-1 ring-emerald-500'
                          : 'border-rose-500 bg-rose-950/40 text-rose-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuiz(q2.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl text-xs border transition-all flex items-start gap-2.5 cursor-pointer ${style}`}
                      >
                        <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="mt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAnswers[q2.id] !== undefined && (
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      isQ2Correct
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950/40 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isQ2Correct ? `✓ ${q2.explanation}` : `✕ Notoʻgʻri. Qaytadan urinib koʻring.`}
                  </div>
                )}
              </div>

              {/* Quiz Completion Banner */}
              {bothQuizzesCorrect ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Ajoyib! Barcha testlar toʻgʻri yechildi. Amaliy topshiriq qulfi ochildi!</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Amaliy topshiriqni yozish uchun har ikkala test savoliga toʻgʻri javob bering.</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Practical Task & AI Homework Checker */}
          {(activeTab === 'audit' || activeTab === 'content' || activeTab === 'quiz') && (
            <div className="rounded-2xl p-6 sm:p-8 bg-[#111a2e] border border-amber-400/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="font-mono-code text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AMALIY TOPSHIRIQ (AUDIT VAZIFASI)
                </div>
                <span className="font-mono-code text-[11px] font-semibold">
                  {bothQuizzesCorrect ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <Unlock className="w-3.5 h-3.5" /> Qulf ochilgan
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1 font-bold">
                      <Lock className="w-3.5 h-3.5" /> Qulflangan
                    </span>
                  )}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {lesson.task}
              </p>

              {/* Answer Textarea */}
              <div className="relative">
                {!bothQuizzesCorrect && (
                  <div className="absolute inset-0 bg-[#0a0f1d]/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center rounded-xl border border-slate-800">
                    <Lock className="w-7 h-7 text-amber-400 mb-2" />
                    <div className="font-mono-code text-xs font-bold text-white">
                      TOPHIRIQ QULFLANGAN
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Iltimos, avval yuqoridagi 2 ta Micro-Quizni toʻgʻri yeching.
                    </p>
                  </div>
                )}

                <textarea
                  id="answer-box"
                  disabled={!bothQuizzesCorrect || isChecking}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Hisob-kitoblar, sabab-oqibat xulosalari va amaliy misollaringizni batafsil yozing..."
                  className="w-full min-h-[140px] p-4 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 resize-y leading-relaxed"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/40 text-rose-300 text-xs flex items-center gap-2 border border-rose-500/40">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Action Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono-code text-slate-400">
                  {answerText.length} belgi kiritildi
                </span>

                <button
                  disabled={!bothQuizzesCorrect || isChecking || !answerText.trim()}
                  onClick={handleCheckHomework}
                  className="btn-modern-primary py-3 px-6 text-xs sm:text-sm flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isChecking ? (
                    <>
                      <div className="flex items-center gap-1 font-mono-code">
                        <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                        <span>AI Tekshirmoqda...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>AI Orqali Tekshirish (Audit)</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* ===== AI Evaluation Result with 3 Criteria ===== */}
              {progress.aiScore !== null && progress.aiScore !== undefined && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold font-mono-code shadow-md shadow-amber-500/20">
                        AI
                      </div>
                      <div>
                        <div className="font-mono-code text-xs uppercase tracking-wider text-amber-400 font-bold">
                          AUDITORNING RASMIY XULOSASI
                        </div>
                        <div className="text-xs text-slate-400">
                          3 ta mezon boʻyicha baholash yakunlandi
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-mono-code text-slate-400">
                          UMUMIY SCORE
                        </div>
                        <div className="font-mono-code text-2xl font-extrabold text-emerald-400 leading-none">
                          {progress.aiScore}
                          <span className="text-xs text-slate-400">/100</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-mono-code text-xs font-extrabold tracking-wider shadow-lg">
                        TASDIQLANDI
                      </div>
                    </div>
                  </div>

                  {/* 3 Criteria Cards */}
                  {progress.criteria && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase">
                            TUSHUNCHA & ANİQLİK
                          </span>
                          <span className="font-mono-code text-xs font-extrabold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            {progress.criteria.conceptAccuracy.grade}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-300 leading-relaxed">
                          {progress.criteria.conceptAccuracy.note}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase">
                            MANTIQIY YONDASHUV
                          </span>
                          <span className="font-mono-code text-xs font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            {progress.criteria.logicalApproach.grade}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-300 leading-relaxed">
                          {progress.criteria.logicalApproach.note}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono-code text-[10px] font-bold text-slate-400 uppercase">
                            AMALIY MISOLLAR
                          </span>
                          <span className="font-mono-code text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            {progress.criteria.practicalExamples.grade}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-300 leading-relaxed">
                          {progress.criteria.practicalExamples.note}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Feedback text */}
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-400/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-amber-400 block mb-1">
                      Auditor sharhi:
                    </span>
                    {progress.aiFeedback}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setShowStampModal(true)}
                      className="text-xs font-mono-code text-amber-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      ★ Rasmiy Tasdiq Muhrini Koʻrish
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Side navigation & Checklist (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Quick Guide Card with Step Checklist */}
          <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-mono-code text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5" /> CHECKLIST
              </h4>
              <span className="text-[10px] font-mono-code text-slate-400">
                {completedPlanCount}/{totalPlanSteps} Bajarildi
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {planSteps.map((step, sIdx) => {
                const isDone = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-950/30 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'hover:bg-slate-800/40 text-slate-400 border border-transparent'
                    }`}
                  >
                    <span className="mt-0.5 text-xs font-mono-code font-bold">
                      {isDone ? '✓' : `0${sIdx + 1}`}
                    </span>
                    <div className="flex-1">
                      <div className="leading-tight text-slate-200">{step.title}</div>
                      <span className="text-[10px] text-slate-500 font-mono-code">{step.timeEst}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sibling Lessons in This Field */}
          <div className="p-5 rounded-2xl bg-[#111a2e] border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-mono-code text-xs uppercase tracking-wider text-slate-300 font-bold">
                {field.name} DARSLARI
              </h4>
              <span className="text-[10px] font-mono-code text-amber-400 font-bold">
                {field.lessons.length} ta dars
              </span>
            </div>

            <div className="space-y-2">
              {field.lessons.map((l, i) => {
                const isCurrent = l.id === lesson.id;
                return (
                  <div
                    key={l.id}
                    onClick={() => {
                      if (!isCurrent) {
                        soundEffects.playClick();
                        onNavigate('lesson', field.id, l.id);
                      }
                    }}
                    className={`p-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400/15 border border-amber-400 text-amber-300 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-code text-[11px] opacity-75">
                        0{i + 1}
                      </span>
                      <span className="line-clamp-1">{l.title}</span>
                    </div>
                    {isCurrent ? (
                      <span className="text-[10px] font-mono-code uppercase text-amber-400 font-bold">
                        Hozirgi
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation CTA Buttons */}
          <div className="space-y-2.5">
            {nextLesson && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onNavigate('lesson', field.id, nextLesson.id);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs font-mono-code shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-between cursor-pointer"
              >
                <span>Keyingi dars: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            {prevLesson && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onNavigate('lesson', field.id, prevLesson.id);
                }}
                className="w-full py-2.5 px-3 rounded-xl text-slate-400 text-xs font-mono-code hover:text-white bg-slate-900 border border-slate-800 transition-all flex items-center gap-2 justify-center cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Oldingi dars: {prevLesson.title}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stamp Celebration Modal */}
      <StampSuccessModal
        isOpen={showStampModal}
        onClose={() => setShowStampModal(false)}
        lessonTitle={lesson.title}
        score={progress.aiScore || 85}
        onNextLesson={
          nextLesson
            ? () => onNavigate('lesson', field.id, nextLesson.id)
            : undefined
        }
      />
    </div>
  );
};
