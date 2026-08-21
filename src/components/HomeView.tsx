import React from 'react';
import { Field, StudyPlanConfig } from '../types';
import { ProgressRing } from './ProgressRing';
import {
  ArrowRight,
  Headphones,
  ShieldCheck,
  Flame,
  ChevronRight,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Star,
  PlayCircle
} from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface HomeViewProps {
  fields: Field[];
  progress: Record<string, { completed: boolean; aiScore: number | null }>;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
  streakDays: number;
  passiveCapital: number;
  studyPlan?: StudyPlanConfig;
  onOpenStudyPlan?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  fields,
  progress,
  onNavigate,
  streakDays,
  passiveCapital,
  studyPlan,
  onOpenStudyPlan
}) => {
  const getFieldCompletedCount = (field: Field) => {
    return field.lessons.filter((l) => progress[`${field.id}:${l.id}`]?.completed).length;
  };

  const totalLessons = fields.reduce((sum, f) => sum + f.lessons.length, 0);
  const totalCompleted = fields.reduce((sum, f) => sum + getFieldCompletedCount(f), 0);
  const totalPercent = Math.round((totalCompleted / (totalLessons || 1)) * 100) || 0;

  // Find the first uncompleted lesson for "Today's Mission"
  let nextLessonToStudy: { fieldId: string; lessonId: string; title: string; fieldName: string } | null = null;
  for (const f of fields) {
    for (const l of f.lessons) {
      if (!progress[`${f.id}:${l.id}`]?.completed) {
        nextLessonToStudy = {
          fieldId: f.id,
          lessonId: l.id,
          title: l.title,
          fieldName: f.name
        };
        break;
      }
    }
    if (nextLessonToStudy) break;
  }

  // Field Theme Configurations
  const getFieldTheme = (id: string) => {
    switch (id) {
      case 'iqtisodiyot':
        return {
          gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
          border: 'border-cyan-500/30 hover:border-cyan-400',
          badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          text: 'text-cyan-400',
          bar: 'bg-gradient-to-r from-cyan-400 to-blue-500',
          hoverGlow: 'hover-glow-cyan',
          icon: '📈',
          tag: 'IQTISODIYOT'
        };
      case 'moliya':
        return {
          gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
          border: 'border-purple-500/30 hover:border-purple-400',
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          text: 'text-purple-400',
          bar: 'bg-gradient-to-r from-purple-400 to-indigo-500',
          hoverGlow: 'hover-glow-purple',
          icon: '💎',
          tag: 'MOLIYA'
        };
      case 'buxgalteriya':
        return {
          gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          border: 'border-emerald-500/30 hover:border-emerald-400',
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          text: 'text-emerald-400',
          bar: 'bg-gradient-to-r from-emerald-400 to-teal-500',
          hoverGlow: 'hover-glow-emerald',
          icon: '📊',
          tag: 'BUXGALTERIYA'
        };
      case 'biznes':
        return {
          gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
          border: 'border-amber-500/30 hover:border-amber-400',
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          text: 'text-amber-400',
          bar: 'bg-gradient-to-r from-amber-400 to-orange-500',
          hoverGlow: 'hover-glow-amber',
          icon: '🏛️',
          tag: 'BIZNES'
        };
      case 'islom-moliyasi':
        return {
          gradient: 'from-teal-500/25 via-emerald-500/15 to-amber-500/10',
          border: 'border-teal-500/40 hover:border-amber-400',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          text: 'text-teal-300',
          bar: 'bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400',
          hoverGlow: 'hover-glow-teal',
          icon: '🕌',
          tag: 'ISLOM MOLIYASI'
        };
      default:
        return {
          gradient: 'from-slate-500/20 to-transparent',
          border: 'border-slate-700',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          text: 'text-slate-300',
          bar: 'bg-amber-400',
          hoverGlow: '',
          icon: '📚',
          tag: 'TAʼLIM'
        };
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* ===== Hero Interactive Showcase ===== */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-[#101935]/90 via-[#0d152a]/95 to-[#090e1c] shadow-2xl p-6 sm:p-10">
        {/* Ambient background light orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Pitch & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-cyan-500/15 border border-amber-400/30 text-xs font-mono-code text-amber-300 font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>5 ta Mukammal Yoʻnalish • Interaktiv Audit Tizimi</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
              Bilim hisobingizni <br />
              <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                haqiqiy ekspert kabi
              </span>{' '}
              yuriting.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Iqtisodiyot, moliya, buxgalteriya, biznes va <b className="text-emerald-400">Islom moliyasi (Muhammadali ustoz)</b> boʻyicha
              strukturaviy dars rejalari, jonli kalkulyatorlar, micro-quizlar va AI auditor tekshiruvini oʻzlashtiring.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  if (nextLessonToStudy) {
                    onNavigate('lesson', nextLessonToStudy.fieldId, nextLessonToStudy.lessonId);
                  } else {
                    onNavigate('field', 'islom-moliyasi');
                  }
                }}
                className="btn-modern-primary py-3.5 px-7 text-sm flex items-center gap-2.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950" />
                <span>{nextLessonToStudy ? 'Darsni Davom Ettirish' : 'Oʻrganishni Boshlash'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenStudyPlan?.();
                }}
                className="btn-modern-secondary py-3.5 px-6 text-sm flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Oʻquv Rejasi</span>
              </button>
            </div>

            {/* Quick Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs font-mono-code">
              <div>
                <div className="text-slate-400 text-[11px]">Jami Darslar</div>
                <div className="text-lg font-bold text-white mt-0.5">{totalLessons} ta Amaliy Dars</div>
              </div>
              <div className="border-x border-slate-800/80 px-4">
                <div className="text-slate-400 text-[11px]">Intizom</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">{streakDays} Kun 🔥</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Passiv Kapital</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{passiveCapital} 💎</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 5-Field Live Progress Radar */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Jonli Audit Holati
                  </span>
                </div>
                <span className="text-xs font-mono-code px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/30 font-bold">
                  {totalCompleted}/{totalLessons} ({totalPercent}%)
                </span>
              </div>

              <div className="space-y-3">
                {fields.map((f) => {
                  const theme = getFieldTheme(f.id);
                  const done = getFieldCompletedCount(f);
                  const pct = Math.round((done / f.lessons.length) * 100);
                  return (
                    <div
                      key={f.id}
                      onClick={() => {
                        soundEffects.playClick();
                        onNavigate('field', f.id);
                      }}
                      className="group p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{theme.icon}</span>
                          <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {f.name}
                          </span>
                        </div>
                        <span className={`font-mono-code font-bold ${done > 0 ? theme.text : 'text-slate-500'}`}>
                          {done}/{f.lessons.length}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>AI Tekshiruv: <b>Faol</b></span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onNavigate('progress');
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Pasportni koʻrish</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Spotlight: Muhammadali Ustoz Islamic Finance Banner ===== */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-teal-500/40 bg-gradient-to-r from-teal-950/60 via-emerald-950/50 to-slate-900 p-6 sm:p-7 shadow-xl shadow-teal-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 p-[2px] shadow-lg shadow-teal-500/20 shrink-0">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center text-2xl">
                🕌
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-[11px] font-mono-code text-teal-300 font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Maxsus Yoʻnalish: Muhammadali Ustoz Darslari
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Islom Moliyasi: Ribo/Gʻarar Taqiqlari, Murobaha va Zakot
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Shariat moliyasi asoslari, sudxoʻrliksiz halol savdo, Muzoraba & Musharaka sherikchiligi hamda 85gr oltin nisobi boʻyicha jonli simulyatorlar.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('field', 'islom-moliyasi');
            }}
            className="self-start md:self-center shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Darslarni Oʻrganish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===== 5 Fields Grid Section with Signature Colors & Glows ===== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>5 TA ASOSIY TAʼLIM YOʻNALISHI</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1">
              Audit Kitoblari & Darsliklar
            </h2>
          </div>
          <div className="font-mono-code text-xs text-slate-400">
            Jami {totalLessons} amaliy dars • AI Auditor baholovi bilan
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {fields.map((f) => {
            const theme = getFieldTheme(f.id);
            const done = getFieldCompletedCount(f);
            const pct = Math.round((done / f.lessons.length) * 100);

            return (
              <div
                key={f.id}
                onClick={() => {
                  soundEffects.playClick();
                  onNavigate('field', f.id);
                }}
                className={`group relative rounded-2xl border ${theme.border} bg-gradient-to-b ${theme.gradient} bg-[#111a2e]/90 p-5 sm:p-6 flex flex-col justify-between hover-lift ${theme.hoverGlow} transition-all cursor-pointer shadow-lg`}
              >
                {/* Top Badge & Number */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border ${theme.badge}`}>
                      {theme.tag}
                    </span>
                    <span className="text-xs font-mono-code text-slate-500 font-bold">
                      #{f.num}
                    </span>
                  </div>

                  <div className="text-3xl">{theme.icon}</div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {f.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Progress Bar & Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-slate-400">Taraqqiyot:</span>
                    <span className={`font-bold ${theme.text}`}>{done} / {f.lessons.length} ({pct}%)</span>
                  </div>

                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white pt-1">
                    <span>Darslarga oʻtish</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Multimedia Studio Quick Access Section ===== */}
      <section className="rounded-2xl border border-slate-800 bg-[#0d1527] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-code text-purple-400 font-bold uppercase tracking-wider">
                PASSIV TAʼLIM STUDIYASI
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Audio & Video Podkastlar
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('passive');
            }}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Barcha podkastlarni tinglash (7 ta)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Yoʻlda, dam olishda yoki ish jarayonida moliyaviy suhbatlar va Muhammadali ustozning biznes etikasi boʻyicha maʼruzalarini tinglang. Har bir material yakunidagi micro-quiz orqali <b className="text-emerald-400">+50 Kapital</b> jamgʻaring.
        </p>
      </section>
    </div>
  );
};
