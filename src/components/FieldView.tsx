import React, { useState } from 'react';
import { Field } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Layers,
  BookOpen,
  CheckCircle2,
  ListOrdered,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { ProgressRing } from './ProgressRing';

interface FieldViewProps {
  field: Field;
  progress: Record<string, { completed: boolean; aiScore: number | null; completedSteps?: string[] }>;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
}

export const FieldView: React.FC<FieldViewProps> = ({
  field,
  progress,
  onNavigate
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'roadmap'>('cards');

  const completedCount = field.lessons.filter(
    (l) => progress[`${field.id}:${l.id}`]?.completed
  ).length;
  const pct = Math.round((completedCount / (field.lessons.length || 1)) * 100);

  // Field Theme Configurations
  const getFieldTheme = (id: string) => {
    switch (id) {
      case 'iqtisodiyot':
        return {
          gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
          border: 'border-cyan-500/40',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          text: 'text-cyan-400',
          bar: 'bg-cyan-400',
          icon: '📈'
        };
      case 'moliya':
        return {
          gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
          border: 'border-purple-500/40',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          text: 'text-purple-400',
          bar: 'bg-purple-400',
          icon: '💎'
        };
      case 'buxgalteriya':
        return {
          gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          border: 'border-emerald-500/40',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          text: 'text-emerald-400',
          bar: 'bg-emerald-400',
          icon: '📊'
        };
      case 'biznes':
        return {
          gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
          border: 'border-amber-500/40',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          text: 'text-amber-400',
          bar: 'bg-amber-400',
          icon: '🏛️'
        };
      case 'islom-moliyasi':
        return {
          gradient: 'from-teal-500/25 via-emerald-500/15 to-amber-500/10',
          border: 'border-teal-500/50',
          badge: 'bg-teal-500/25 text-teal-300 border-teal-500/50',
          text: 'text-teal-300',
          bar: 'bg-gradient-to-r from-teal-400 to-amber-400',
          icon: '🕌'
        };
      default:
        return {
          gradient: 'from-slate-500/20 to-transparent',
          border: 'border-slate-700',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          text: 'text-slate-300',
          bar: 'bg-amber-400',
          icon: '📚'
        };
    }
  };

  const theme = getFieldTheme(field.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Back Button */}
      <button
        onClick={() => {
          soundEffects.playClick();
          onNavigate('home');
        }}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-code text-slate-400 hover:text-amber-400 transition-colors focus-visible:outline-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Boshqaruv paneliga qaytish
      </button>

      {/* Field Header Card */}
      <div className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${theme.gradient} bg-[#111a2e] border-2 ${theme.border} flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl overflow-hidden`}>
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider font-bold">
            <span className={`px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
              {field.num}-YOʻNALISH: {field.tag}
            </span>
            {field.level && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-amber-400/30">
                {field.level}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white font-extrabold flex items-center gap-3">
            <span>{theme.icon}</span>
            <span>{field.name}</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {field.desc}
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 self-start sm:self-auto shadow-inner">
          <ProgressRing percentage={pct} size={58} strokeWidth={5} />
          <div>
            <div className="text-xs font-mono-code text-slate-400 uppercase">
              Bajarilish
            </div>
            <div className="font-mono-code text-base font-bold text-white">
              {completedCount} / {field.lessons.length} dars
            </div>
            <div className="text-[11px] font-mono-code text-amber-400 mt-0.5 font-bold">
              {pct === 100 ? 'Toʻliq yakunlandi ★' : `${100 - pct}% qoldi`}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl text-white font-bold">
            {viewMode === 'cards' ? 'Amaliy Darslar Roʻyxati' : 'Oʻquv Rejasi va Marshruti (Syllabus)'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setViewMode('cards');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Klassik Roʻyxat</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setViewMode('roadmap');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'roadmap'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Strukturaviy Reja (Roadmap)</span>
          </button>
        </div>
      </div>

      {/* View Mode 1: Cards */}
      {viewMode === 'cards' && (
        <div className="space-y-4">
          {field.lessons.map((lesson, idx) => {
            const entry = progress[`${field.id}:${lesson.id}`];
            const isDone = !!entry?.completed;
            const stepCount = lesson.reja?.length || 5;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  soundEffects.playClick();
                  onNavigate('lesson', field.id, lesson.id);
                }}
                className="group relative rounded-2xl p-5 sm:p-6 bg-[#111a2e]/90 border border-slate-800 hover:border-amber-400/50 hover:bg-[#142038] hover-lift transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Step Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono-code text-base font-bold border-2 shrink-0 transition-all ${
                      isDone
                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-md'
                        : 'border-slate-700 text-slate-400 bg-slate-900'
                    }`}
                  >
                    {isDone ? '✓' : `0${idx + 1}`}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {lesson.title}
                      </h4>
                      {isDone && (
                        <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          AUDIT QILINDI ★
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {lesson.dur}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" /> {stepCount} bosqichli reja
                      </span>
                      <span>•</span>
                      <span>2 ta Micro-Quiz</span>
                      {entry?.aiScore !== null && entry?.aiScore !== undefined && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">
                            AI Bahosi: {entry.aiScore}/100
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button className="py-2.5 px-4 rounded-xl text-xs font-bold font-mono-code border border-slate-700 text-slate-200 group-hover:border-amber-400 group-hover:text-slate-950 group-hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md">
                    <span>{isDone ? 'Darsni qayta koʻrish' : 'Reja asosida boshlash'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 2: Detailed Roadmap Timeline */}
      {viewMode === 'roadmap' && (
        <div className="rounded-2xl p-6 sm:p-8 bg-[#111a2e] border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-mono-code text-xs uppercase tracking-widest text-amber-400 font-bold">
              {field.name.toUpperCase()} BOʻYICHA TOʻLIQ OʻQUV REJASI VA MUDDATLARI
            </span>
            <span className="text-xs font-mono-code text-slate-400">
              {completedCount}/{field.lessons.length} dars yakunlangan
            </span>
          </div>

          <div className="space-y-8">
            {field.lessons.map((lesson, idx) => {
              const entry = progress[`${field.id}:${lesson.id}`];
              const isDone = !!entry?.completed;

              return (
                <div key={lesson.id} className="relative pl-6 sm:pl-8 border-l-2 border-amber-400/40 space-y-3">
                  {/* Timeline bullet */}
                  <div
                    className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono-code text-xs font-bold ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'bg-slate-900 border-amber-400 text-amber-400'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-display text-xl font-bold text-white">
                        {idx + 1}-Dars: {lesson.title}
                      </h4>
                      <span className="text-xs font-mono-code text-slate-400">
                        ⏱️ Davomiyligi: {lesson.dur}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        onNavigate('lesson', field.id, lesson.id);
                      }}
                      className="btn-modern-primary text-xs py-2 px-4 self-start sm:self-auto cursor-pointer"
                    >
                      {isDone ? 'Qayta oʻrganish' : 'Darsga oʻtish →'}
                    </button>
                  </div>

                  {/* Syllabus Sub-steps */}
                  {lesson.reja && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {lesson.reja.map((step) => (
                        <div
                          key={step.id}
                          className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 font-bold">
                            <span className="truncate text-slate-200">{step.title}</span>
                            <span className="text-[10px] text-amber-400 shrink-0 ml-1 font-bold">{step.timeEst}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
