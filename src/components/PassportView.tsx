import React, { useState } from 'react';
import { Field, LessonProgress, UserProfile, LeaderboardEntry, Badge } from '../types';
import {
  ShieldCheck,
  Flame,
  Sparkles,
  Trophy,
  CheckCircle2,
  ArrowLeft,
  Edit2,
  Check,
  Printer,
  Calendar,
  Layers,
  Clock,
  BookOpen,
  Award,
  Star
} from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { BADGES_CONFIG } from '../data/learningData';

interface PassportViewProps {
  fields: Field[];
  progress: Record<string, LessonProgress>;
  userProfile: UserProfile;
  onUpdateUserName: (name: string) => void;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
  onOpenStudyPlan?: () => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  fields,
  progress,
  userProfile,
  onUpdateUserName,
  onNavigate,
  onOpenStudyPlan
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile.name);

  const getFieldCompletedCount = (field: Field) => {
    return field.lessons.filter((l) => progress[`${field.id}:${l.id}`]?.completed).length;
  };

  const totalLessons = fields.reduce((sum, f) => sum + f.lessons.length, 0);
  const totalCompleted = fields.reduce((sum, f) => sum + getFieldCompletedCount(f), 0);

  // Calculate average score
  const allProgressEntries = Object.values(progress) as LessonProgress[];
  const completedEntries = allProgressEntries.filter(
    (p) => p && p.completed && p.aiScore !== null && p.aiScore !== undefined
  );
  const avgScore =
    completedEntries.length > 0
      ? Math.round(
          completedEntries.reduce((acc: number, cur: LessonProgress) => acc + (cur.aiScore || 0), 0) /
            completedEntries.length
        )
      : 0;

  // Determine unlocked badges
  const isFinanceAll = getFieldCompletedCount(fields.find((f) => f.id === 'moliya') || fields[1]) >= 2;
  const isAccountingAll = getFieldCompletedCount(fields.find((f) => f.id === 'buxgalteriya') || fields[2]) >= 2;
  const isBusinessAll = getFieldCompletedCount(fields.find((f) => f.id === 'biznes') || fields[3]) >= 2;
  const isIslamicAll = getFieldCompletedCount(fields.find((f) => f.id === 'islom-moliyasi') || fields[4]) >= 2;

  const badges: Badge[] = BADGES_CONFIG.map((b) => {
    let unlocked = false;
    if (b.id === 'first_audit') unlocked = totalCompleted >= 1;
    if (b.id === 'finance_master') unlocked = isFinanceAll;
    if (b.id === 'accounting_pro') unlocked = isAccountingAll;
    if (b.id === 'business_strategist') unlocked = isBusinessAll;
    if (b.id === 'islamic_finance_scholar') unlocked = isIslamicAll;
    if (b.id === 'streak_discipline') unlocked = userProfile.streak >= 7 || totalCompleted >= 5;
    if (b.id === 'passive_capitalist') unlocked = userProfile.passiveCapital >= 150;
    if (b.id === 'honor_auditor') unlocked = avgScore >= 90 && totalCompleted >= 2;

    return {
      ...b,
      isUnlocked: unlocked
    };
  });

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateUserName(nameInput.trim());
      setIsEditingName(false);
      soundEffects.playSuccess();
    }
  };

  const handlePrint = () => {
    soundEffects.playStamp();
    window.print();
  };

  // Study plan config
  const studyPlan = userProfile.studyPlan;

  // Leaderboard data
  const dynamicLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'Azizbek Qodirov',
      lessonsDone: 10,
      totalLessons: 10,
      avgScore: 96,
      capital: 420
    },
    {
      rank: 2,
      name: 'Madina Rahimova',
      lessonsDone: 9,
      totalLessons: 10,
      avgScore: 94,
      capital: 380
    },
    {
      rank: 3,
      name: userProfile.name,
      lessonsDone: totalCompleted,
      totalLessons: totalLessons,
      avgScore: avgScore || 88,
      capital: userProfile.passiveCapital,
      isCurrentUser: true
    },
    {
      rank: 4,
      name: 'Jasur Temirov',
      lessonsDone: 6,
      totalLessons: 10,
      avgScore: 86,
      capital: 210
    },
    {
      rank: 5,
      name: 'Dilnoza Karimova',
      lessonsDone: 5,
      totalLessons: 10,
      avgScore: 84,
      capital: 175
    }
  ].sort((a, b) => b.capital - a.capital).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => {
            soundEffects.playClick();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-code text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
        </button>

        <div className="flex items-center gap-2.5">
          {onOpenStudyPlan && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenStudyPlan();
              }}
              className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono-code text-amber-400 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" /> Oʻquv Rejasini Sozlash
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-amber-400/40 bg-amber-400/10 text-xs font-mono-code text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer shadow-sm font-bold"
          >
            <Printer className="w-3.5 h-3.5" /> Chop etish / Sertifikat
          </button>
        </div>
      </div>

      {/* ===== Modern Moliyaviy Pasport (The Passbook / Certificate Card) ===== */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#111a2e] via-[#0d1627] to-[#142038] text-white shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
        {/* Background glow watermark */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none">
          <ShieldCheck className="w-64 h-64 text-amber-400" />
        </div>

        {/* Passport Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="font-mono-code text-xs tracking-widest uppercase text-amber-400 font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>MOLIYAVIY AUDIT VA MALAKA PASPORTI</span>
            </div>
            <div className="flex items-center gap-3">
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="p-2 text-lg font-display font-bold border border-amber-400 rounded-xl bg-slate-900 text-white focus:outline-none"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 bg-amber-400 text-slate-950 rounded-xl hover:bg-amber-300 cursor-pointer font-bold"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {userProfile.name}
                  </h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-amber-400 p-1 cursor-pointer transition-colors"
                    title="Ismni oʻzgartirish"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="text-xs font-mono-code text-slate-400 flex items-center gap-3">
              <span>ID: <b className="text-slate-200">{userProfile.passportId}</b></span>
              <span>•</span>
              <span>Roʻyxat sanasi: <b className="text-slate-200">{userProfile.registeredDate}</b></span>
            </div>
          </div>

          {/* Official Stamp Badge */}
          <div className="self-end sm:self-auto border-2 border-emerald-500 bg-emerald-950/40 text-emerald-400 px-5 py-2 rounded-2xl font-mono-code text-xs font-extrabold tracking-widest -rotate-3 shadow-lg ring-2 ring-emerald-500/20 select-none">
            TASDIQLANDI ★ AUDITED
          </div>
        </div>

        {/* Passport Ledger Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-5 bg-slate-900/80 rounded-2xl border border-slate-800 text-center relative z-10">
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase font-semibold">
              Bajarilgan Darslar
            </div>
            <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-white">
              {totalCompleted} <span className="text-xs text-slate-400">/ {totalLessons}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase font-semibold">
              Oʻrtacha Audit Bahosi
            </div>
            <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {avgScore || '--'} <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase font-semibold">
              Audit Intizomi
            </div>
            <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>{userProfile.streak} kun</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase font-semibold">
              Passiv Kapital
            </div>
            <div className="font-mono-code text-2xl sm:text-3xl font-extrabold text-cyan-400 flex items-center justify-center gap-1">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{userProfile.passiveCapital}</span>
            </div>
          </div>
        </div>

        {/* Shaxsiy O'quv Rejasi Card inside Passport */}
        {studyPlan && (
          <div className="mb-8 p-5 bg-amber-400/5 rounded-2xl border border-amber-400/20 relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-amber-400/20 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-mono-code text-xs uppercase tracking-wider font-bold text-amber-300">
                  SHAXSIY TAʼLIM REJASI & MAQSAD
                </span>
              </div>
              <span className="text-xs font-mono-code text-amber-400 font-bold">
                ⏱️ Kunlik maqsad: {studyPlan.dailyTargetMinutes} daqiqa
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400">Haftalik Reja:</div>
                <div className="font-bold text-white mt-0.5">{studyPlan.weeklyDays} kun/hafta</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400">Asosiy Fokus:</div>
                <div className="font-bold text-white mt-0.5 capitalize">
                  {studyPlan.preferredFieldId === 'all' ? 'Barcha 5 ta yoʻnalish' : studyPlan.preferredFieldId}
                </div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono-code text-slate-400">Maqsadli Daraja:</div>
                <div className="font-bold text-amber-400 uppercase mt-0.5">{studyPlan.targetGoal}</div>
              </div>
            </div>
          </div>
        )}

        {/* Breakdown by 5 fields */}
        <div className="space-y-2.5 font-mono-code text-xs sm:text-sm relative z-10">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
            5 ta Yoʻnalish boʻyicha hisobot balansi
          </div>

          {fields.map((f) => {
            const done = getFieldCompletedCount(f);
            const pct = Math.round((done / (f.lessons.length || 1)) * 100);
            return (
              <div
                key={f.id}
                className="py-3 flex items-center justify-between border-b border-slate-800/80 hover:bg-white/5 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold">{f.num}</span>
                  <span className="font-semibold text-slate-200">{f.name}</span>
                </div>
                <div className="font-bold text-slate-300 flex items-center gap-3">
                  <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span>{done} / {f.lessons.length} ({pct}%)</span>
                </div>
              </div>
            );
          })}

          <div className="pt-4 flex items-center justify-between text-sm sm:text-base font-bold border-t border-slate-800 text-white">
            <span>JAMI YAKUNLANGAN AUDIT</span>
            <span className="text-amber-400 font-extrabold">{totalCompleted} / {totalLessons}</span>
          </div>
        </div>
      </div>

      {/* ===== Audit Stamps / Badges ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 font-bold">
              ERISHILGAN MAVQELAR
            </div>
            <h3 className="font-display text-2xl text-white font-bold mt-0.5">
              Audit Muhrlari va Sertifikatlar
            </h3>
          </div>
          <div className="text-xs font-mono-code text-slate-400">
            {badges.filter((b) => b.isUnlocked).length} / {badges.length} ochilgan
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 shadow-lg ${
                  badge.isUnlocked
                    ? 'bg-[#111a2e] border-amber-400/50 text-white hover-lift'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                    badge.isUnlocked
                      ? 'bg-amber-400/15 border-amber-400 text-amber-400 shadow-md'
                      : 'bg-slate-950 border-slate-800 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-base font-bold text-white leading-snug">
                      {badge.title}
                    </h4>
                    {badge.isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {badge.desc}
                  </p>
                  <div className="text-[10px] font-mono-code font-bold uppercase tracking-wider mt-1">
                    {badge.isUnlocked ? (
                      <span className="text-amber-400">★ TASDIQLANGAN</span>
                    ) : (
                      <span className="text-slate-600">QULFLANGAN</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Top-5 Mini-Leaderboard ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-amber-400 font-bold">
              REYTINQ JADVALI
            </div>
            <h3 className="font-display text-2xl text-white font-bold mt-0.5 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" /> Top-5 Auditorlar
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            Haftalik yangilanadi
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#111a2e] shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm font-mono-code">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Auditor Ismi</th>
                <th className="py-3.5 px-4 text-center">Darslar</th>
                <th className="py-3.5 px-4 text-center">Oʻrtacha Baho</th>
                <th className="py-3.5 px-4 text-right">Kapital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dynamicLeaderboard.map((u) => {
                const isMe = u.isCurrentUser;
                return (
                  <tr
                    key={u.rank}
                    className={`transition-colors ${
                      isMe
                        ? 'bg-amber-400/10 text-amber-300 font-bold ring-1 ring-inset ring-amber-400/30'
                        : 'hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <td className="py-4 px-4 text-center font-bold">
                      {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : u.rank}
                    </td>
                    <td className="py-4 px-4 flex items-center gap-2">
                      <span className="font-sans font-semibold text-sm">
                        {u.name}
                      </span>
                      {isMe && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase font-bold">
                          Siz
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {u.lessonsDone} / {u.totalLessons}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-bold text-emerald-400">
                        {u.avgScore} / 100
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-amber-400">
                      {u.capital} 💎
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
