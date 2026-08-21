import React, { useState } from 'react';
import { StudyPlanConfig, Field } from '../types';
import { soundEffects } from '../utils/sound';
import { Calendar, Clock, Target, Sparkles, CheckCircle2, X } from 'lucide-react';

interface StudyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: StudyPlanConfig;
  onSavePlan: (newPlan: StudyPlanConfig) => void;
  fields: Field[];
  totalCompletedLessons: number;
}

export const StudyPlanModal: React.FC<StudyPlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSavePlan,
  fields,
  totalCompletedLessons
}) => {
  const [dailyMinutes, setDailyMinutes] = useState(plan?.dailyTargetMinutes || 20);
  const [weeklyGoal, setWeeklyGoal] = useState(plan?.weeklyLessonsGoal || 4);
  const [preferredTime, setPreferredTime] = useState<'ertalab' | 'kunduzi' | 'kechqurun'>(
    plan?.preferredTime || 'kechqurun'
  );
  const [targetFinishDays, setTargetFinishDays] = useState(plan?.targetFinishDays || 14);

  if (!isOpen) return null;

  const totalLessons = fields.reduce((sum, f) => sum + f.lessons.length, 0);
  const remainingLessons = Math.max(0, totalLessons - totalCompletedLessons);

  const handleSave = () => {
    soundEffects.playStamp();
    onSavePlan({
      dailyTargetMinutes: dailyMinutes,
      weeklyLessonsGoal: weeklyGoal,
      preferredTime,
      targetFinishDays,
      startDate: plan?.startDate || new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="rounded-3xl bg-[#111a2e] border-2 border-amber-400/40 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-800 pb-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-2xl text-amber-400 shadow-inner">
            📅
          </div>
          <div>
            <div className="text-[10px] font-mono-code text-amber-400 tracking-widest uppercase font-bold">
              SHAXSIY TAʼLIM GRAFIGI
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Shaxsiy Oʻquv Rejasi & Audit Jadvali
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Target Status Summary */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center text-xs font-mono-code">
            <div>
              <div className="text-slate-400 text-[10px]">Jami Darslar</div>
              <div className="text-base font-bold text-amber-400">{totalLessons} ta</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-slate-400 text-[10px]">Bajarilgan</div>
              <div className="text-base font-bold text-emerald-400">{totalCompletedLessons} ta</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Qolgan darslar</div>
              <div className="text-base font-bold text-cyan-400">{remainingLessons} ta</div>
            </div>
          </div>

          {/* Option 1: Kunlik vaqt sarfi */}
          <div className="space-y-2">
            <label className="block text-xs font-mono-code text-slate-200 font-bold">
              1. Kuniga qancha vaqt ajrata olasiz?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[15, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    setDailyMinutes(mins);
                    soundEffects.playClick();
                  }}
                  className={`py-3 px-3 rounded-xl border text-xs font-mono-code transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    dailyMinutes === mins
                      ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md font-bold'
                      : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-bold">⏱️ {mins} daqiqa</span>
                  <span className="text-[10px] opacity-75">
                    {mins === 15 ? 'Ekspress surʼat' : mins === 30 ? 'Standart reja' : 'Chuqur audit'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Option 2: Haftalik maqsad */}
          <div className="space-y-2">
            <label className="block text-xs font-mono-code text-slate-200 font-bold">
              2. Haftasiga nechta darsni toʻliq audit qilmoqchisiz?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 4, 8].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => {
                    setWeeklyGoal(goal);
                    soundEffects.playClick();
                  }}
                  className={`py-3 px-3 rounded-xl border text-xs font-mono-code transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    weeklyGoal === goal
                      ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md font-bold'
                      : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-bold">🎯 {goal} ta dars</span>
                  <span className="text-[10px] opacity-75">
                    {goal === 2 ? 'Haftada 2 kun' : goal === 4 ? 'Haftada 4 kun' : 'Intensiv (Barchasi)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Qulay vaqt */}
          <div className="space-y-2">
            <label className="block text-xs font-mono-code text-slate-200 font-bold">
              3. Oʻrganish uchun eng qulay vaqtingiz:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { id: 'ertalab', label: '🌅 Ertalab', sub: '07:00 - 09:00' },
                  { id: 'kunduzi', label: '☀️ Kunduzi', sub: '12:00 - 15:00' },
                  { id: 'kechqurun', label: '🌙 Kechqurun', sub: '20:00 - 23:00' }
                ] as const
              ).map((time) => (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => {
                    setPreferredTime(time.id);
                    soundEffects.playClick();
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-mono-code transition-all text-center cursor-pointer ${
                    preferredTime === time.id
                      ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md font-bold'
                      : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">{time.label}</div>
                  <div className="text-[10px] opacity-75">{time.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Option 4: Hafta bo'yicha Reja Yo'l Xaritasi */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-code">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                🗺️ {fields.length} Bosqichli Taʼlim Marshruti
              </span>
              <span className="text-slate-400">
                Kutilayotgan tugatish: ~{Math.ceil(remainingLessons / (weeklyGoal / 7 || 1))} kun
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono-code">
              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 font-semibold">{f.name}</span>
                    <span className="text-[10px] text-slate-500">({f.lessons.length} ta dars)</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">
                    {idx + 1}-bosqich
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-5 mt-6">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono-code hover:text-white transition-colors cursor-pointer"
          >
            Bekor qilish
          </button>
          <button onClick={handleSave} className="btn-modern-primary text-xs py-2.5 px-6 flex items-center gap-2 cursor-pointer shadow-lg">
            <span>💾 Rejani Faollashtirish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
