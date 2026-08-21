import React, { useState } from 'react';
import {
  Bell,
  Flame,
  CheckCircle2,
  Sparkles,
  BookOpen,
  X,
  Calendar,
  Compass,
  Award,
  Radio,
  ShieldCheck,
  GraduationCap,
  User,
  LogOut,
  ChevronDown,
  KeyRound
} from 'lucide-react';
import { soundEffects } from '../utils/sound';
import { AuthUser } from '../types';

interface TopBarProps {
  currentView: string;
  onNavigate: (view: string, fieldId?: string, lessonId?: string) => void;
  streakDays: number;
  totalCompleted: number;
  totalLessons: number;
  passiveCapital: number;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenStudyPlan?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onNavigate,
  streakDays,
  totalCompleted,
  totalLessons,
  passiveCapital,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenStudyPlan
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewAlerts, setHasNewAlerts] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = () => {
    soundEffects.playClick();
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setHasNewAlerts(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Boshqaruv Paneli', icon: Compass },
    { id: 'passive', label: 'Audio & Video Studiya', icon: Radio },
    { id: 'progress', label: 'Moliyaviy Pasport', icon: Award }
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Portali', icon: ShieldCheck });
  } else if (currentUser?.role === 'teacher') {
    navItems.push({ id: 'teacher', label: 'Ustoz Xonasi', icon: GraduationCap });
  }

  const roleLabel =
    currentUser?.role === 'admin'
      ? '👑 Bosh Admin'
      : currentUser?.role === 'teacher'
      ? currentUser.teacherStatus === 'approved'
        ? '👨‍🏫 Ustoz'
        : '⏳ Ustoz (Kutilmoqda)'
      : '👨‍🎓 Oʻquvchi';

  const roleBadgeColor =
    currentUser?.role === 'admin'
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      : currentUser?.role === 'teacher'
      ? currentUser.teacherStatus === 'approved'
        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur-xl shadow-xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-3 text-left group transition-transform focus-visible:outline-none cursor-pointer shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center font-display text-xl font-extrabold text-amber-400">
              HD
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0a0f1d]"></span>
            </span>
          </div>
          <div>
            <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>Hisob Daftari</span>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                v2.6
              </span>
            </div>
            <div className="text-[10px] font-mono-code tracking-wider uppercase text-slate-400 flex items-center gap-1">
              <span>5 Yoʻnalishli Taʼlim</span>
              <span>•</span>
              <span className="text-emerald-400">Muhammadali Ustoz</span>
            </div>
          </div>
        </button>

        {/* Navigation tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-[#111a2e]/90 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'home' && (currentView === 'field' || currentView === 'lesson'));
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEffects.playClick();
                  onNavigate(item.id);
                }}
                className={`whitespace-nowrap shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 font-bold shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Engagement & Controls Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Study Plan Button */}
          {onOpenStudyPlan && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenStudyPlan();
              }}
              title="Shaxsiy Oʻquv Rejasini sozlash"
              className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono-code text-slate-300 hover:border-amber-400/50 hover:text-amber-400 transition-all cursor-pointer hover:shadow-lg hover:shadow-amber-500/10"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Oʻquv Rejasi</span>
            </button>
          )}

          {/* Streak Indicator */}
          <div
            title={`Ketma-ket ${streakDays} kunlik faol intizom`}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/30 text-xs font-mono-code font-bold text-orange-400 shadow-md shadow-orange-500/10 transition-transform hover:scale-105"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="whitespace-nowrap">{streakDays} Kun 🔥</span>
          </div>

          {/* Passive Capital Badge */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('progress');
            }}
            title="Sizning passiv bilim kapitalingiz"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 text-xs font-mono-code text-emerald-300 cursor-pointer hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/15 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-extrabold text-white">{passiveCapital}</span>
            <span className="hidden sm:inline text-[10px] text-emerald-400 uppercase font-bold">Kapital</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700 transition-all focus-visible:outline-none cursor-pointer"
              aria-label="Xabarlar va eslatmalar"
            >
              <Bell className="w-4 h-4" />
              {hasNewAlerts && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#0a0f1d] animate-ping" />
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#111a2e] border border-amber-400/30 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-display text-base text-white font-bold">
                    Audit Xabarnomalari
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 font-mono-code font-bold text-[11px]">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      KUNLIK INTIZOM MAQSADI
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Bugungi hisob yozuvlarini yakunlash uchun kamida bitta amaliy topshiriqni bajaring va {streakDays}-kunlik seriyani saqlab qoling!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-teal-400 font-mono-code font-bold text-[11px]">
                      <BookOpen className="w-3.5 h-3.5" />
                      5-YOʻNALISH: ISLOM MOLIYASI
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Muhammadali ustozning Ribo/Gʻarar taqiqlari hamda Murobaha va Muzoraba shartnomalari darslari ochildi!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono-code font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      AI AUDITOR TIZIMI FAOL
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Har bir amaliy javobingiz 3 ta mezon (Aniqlik, Mantiq, Misollar) boʻyicha avtomatik tahlil qilinadi.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('progress');
                    }}
                    className="text-xs font-mono-code text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    Pasport va Yutuqlarni koʻrish →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Profile Menu */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setShowUserMenu(!showUserMenu);
                }}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs font-display">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-white truncate max-w-[110px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400">
                    {roleLabel}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenAuthModal();
                }}
                className="btn-modern-primary py-2 px-3 sm:px-4 text-xs font-mono-code font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <User className="w-3.5 h-3.5" />
                <span>Kirish / Registratsiya</span>
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {showUserMenu && currentUser && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#111a2e] border border-slate-700 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
                <div className="pb-3 border-b border-slate-800">
                  <div className="font-bold text-sm text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-400 truncate">{currentUser.email}</div>
                  <div className="mt-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold border ${roleBadgeColor}`}>
                      {roleLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono-code">
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('admin');
                      }}
                      className="w-full text-left p-2 rounded-lg text-rose-300 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer font-bold"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>Admin Portali</span>
                    </button>
                  )}

                  {currentUser.role === 'teacher' && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('teacher');
                      }}
                      className="w-full text-left p-2 rounded-lg text-teal-300 hover:bg-teal-950/40 flex items-center gap-2 cursor-pointer font-bold"
                    >
                      <GraduationCap className="w-4 h-4 text-teal-400" />
                      <span>Ustoz Kabineti</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onNavigate('progress');
                    }}
                    className="w-full text-left p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Moliyaviy Pasport</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenAuthModal();
                    }}
                    className="w-full text-left p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    <span>Hisobni almashtirish</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      soundEffects.playClick();
                      onLogout();
                    }}
                    className="w-full text-left p-2 rounded-lg text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 text-xs font-mono-code cursor-pointer font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Chiqish (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav pills bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800/80 bg-[#080c17]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id === 'home' && (currentView === 'field' || currentView === 'lesson'));
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEffects.playClick();
                onNavigate(item.id);
              }}
              className={`text-xs py-1.5 px-3 rounded-lg font-medium flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'text-slate-950 bg-amber-400 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
