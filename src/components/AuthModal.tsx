import React, { useState } from 'react';
import { AuthUser, UserRole } from '../types';
import { soundEffects } from '../utils/sound';
import { isAdminEmail, ADMIN_EMAILS } from '../data/authData';
import {
  ShieldCheck,
  User,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Database
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  registeredUsers: AuthUser[];
  onRegisterUser: (newUser: AuthUser) => void;
  allowClose?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  registeredUsers,
  onRegisterUser,
  allowClose = false
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [specialty, setSpecialty] = useState('Islom Moliyasi va Biznes boshqaruvi');
  const [experience, setExperience] = useState('5 yillik tajriba');
  const [bio, setBio] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Iltimos, email va parolni toʻliq kiriting.');
      return;
    }

    // 1. Server-side rule check: Is this email in the ADMIN_EMAILS list?
    const isTargetAdmin = isAdminEmail(cleanEmail);

    // 2. Find in registered users database
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (found) {
      if (found.password && found.password !== cleanPass) {
        setErrorMsg('Kiritilgan parol notoʻgʻri. Qaytadan urinib koʻring.');
        return;
      }

      // Role determination: Ensure admin emails always have admin role
      const effectiveRole: UserRole = isTargetAdmin ? 'admin' : found.role;
      const authenticatedUser: AuthUser = {
        ...found,
        role: effectiveRole
      };

      soundEffects.playSuccess();
      setSuccessMsg(
        isTargetAdmin
          ? `🛡️ Xush kelibsiz, Bosh Administrator (${cleanEmail})!`
          : `Xush kelibsiz, ${found.name}!`
      );

      setTimeout(() => {
        onLoginSuccess(authenticatedUser);
      }, 400);
      return;
    }

    // If not found in mock list, but is in admin list:
    if (isTargetAdmin) {
      const newAdmin: AuthUser = {
        id: `usr_adm_${Date.now()}`,
        name: cleanEmail.includes('1') ? 'Bosh Administrator 1' : 'Bosh Administrator 2',
        email: cleanEmail,
        password: cleanPass,
        role: 'admin',
        registeredDate: new Date().toLocaleDateString('uz-UZ'),
        bio: 'Xavfsiz tizim administratori.'
      };
      onRegisterUser(newAdmin);
      soundEffects.playSuccess();
      setSuccessMsg(`🛡️ Xush kelibsiz, Bosh Administrator (${cleanEmail})!`);
      setTimeout(() => {
        onLoginSuccess(newAdmin);
      }, 400);
      return;
    }

    // If regular new user attempting instant login:
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      password: cleanPass,
      role: 'student',
      registeredDate: new Date().toLocaleDateString('uz-UZ'),
      bio: 'Platforma oʻquvchisi.'
    };
    onRegisterUser(newUser);
    soundEffects.playSuccess();
    setSuccessMsg(`Xush kelibsiz, ${newUser.name}!`);
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!fullName.trim()) {
      setErrorMsg('Iltimos, ism-sharifingizni kiriting.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Iltimos, toʻgʻri email manzilini kiriting.');
      return;
    }
    if (!cleanPass || cleanPass.length < 3) {
      setErrorMsg('Parol kamida 3 ta belgidan iborat boʻlishi kerak.');
      return;
    }

    // Role assignment: Check if email is in ADMIN_EMAILS
    const isTargetAdmin = isAdminEmail(cleanEmail);
    const assignedRole: UserRole = isTargetAdmin ? 'admin' : selectedRole;

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: fullName.trim(),
      email: cleanEmail,
      password: cleanPass,
      role: assignedRole,
      specialty: assignedRole === 'teacher' ? specialty : undefined,
      experience: assignedRole === 'teacher' ? experience : undefined,
      bio: bio.trim() || (assignedRole === 'admin' ? 'Bosh Administrator' : assignedRole === 'teacher' ? 'Ustoz-mutaxassis' : 'Moliya va audit talabasi'),
      teacherStatus: assignedRole === 'teacher' ? 'pending' : undefined,
      registeredDate: new Date().toLocaleDateString('uz-UZ')
    };

    onRegisterUser(newUser);
    soundEffects.playStamp();

    if (assignedRole === 'admin') {
      setSuccessMsg('🛡️ Admin hisobi muvaffaqiyatli faollashtirildi!');
    } else if (assignedRole === 'teacher') {
      setSuccessMsg('Ustozlik arizangiz yuborildi! Administrator tasdiqlashi kutilmoqda.');
    } else {
      setSuccessMsg('Muvaffaqiyatli roʻyxatdan oʻtdingiz!');
    }

    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 600);
  };

  // Quick Demo Account Click Handler
  const handleQuickDemoLogin = (targetUser: AuthUser) => {
    soundEffects.playClick();
    setEmail(targetUser.email);
    setPassword(targetUser.password || '123');
    soundEffects.playSuccess();
    onLoginSuccess(targetUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#111a2e] via-[#0d1627] to-[#142038] text-white shadow-2xl border-2 border-amber-400/40 animate-in zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto">
        {/* Close button if allowed */}
        {allowClose && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-400 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            {authMode === 'login' ? 'Tizimga Kirish' : 'Hisob Yaratish (Registratsiya)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {authMode === 'login'
              ? 'Xavfsiz kirish tizimi: Barcha foydalanuvchilar, Ustozlar va Adminlar uchun yagona kirish.'
              : 'Oʻquvchi yoki Ustoz maqomida roʻyxatdan oʻtib, amaliy taʼlimni boshlang.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setAuthMode('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono-code transition-all font-bold cursor-pointer ${
              authMode === 'login'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kirish (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              setAuthMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono-code transition-all font-bold cursor-pointer ${
              authMode === 'register'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Roʻyxatdan oʻtish (Register)
          </button>
        </div>

        {/* Error / Success Banners */}
        {errorMsg && (
          <div className="p-3.5 mb-5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 mb-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form: LOGIN */}
        {authMode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Email manzil:
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Admin: admin1@moliya.uz, admin2@moliya.uz
                </span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masalan: oquvchi@moliya.uz yoki admin1@moliya.uz"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5 font-semibold">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Parol:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingizni kiriting"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-modern-primary py-3.5 px-6 text-sm font-bold font-mono-code flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 mt-2"
            >
              <span>Platformaga Kirish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Form: REGISTER */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono-code text-slate-300 block font-semibold">
                Maqomingizni tanlang:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-900 text-amber-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">👨‍🎓 Oʻquvchi</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      Darslar, testlar, AI audit va pasport
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    selectedRole === 'teacher'
                      ? 'bg-teal-400/15 border-teal-400 text-teal-300 shadow-md ring-1 ring-teal-400/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-900 text-teal-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">👨‍🏫 Oʻqituvchi / Ustoz</div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      Admin tasdigʻi orqali faollashadi
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300 block font-semibold">
                  Ism va Familiyangiz:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="masalan: Sarvinoz Muzaffarovna"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300 block font-semibold">
                  Email manzil:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masalan: sarvinoz@student.uz"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 block font-semibold">
                Doimiy kirish paroli:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 3-6 ta belgi kiriting"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Extra fields if Teacher */}
            {selectedRole === 'teacher' && (
              <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-3 animate-in fade-in">
                <div className="text-xs font-mono-code text-teal-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Ustozlik maʼlumotlari:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-code text-slate-300">Mutaxassislik yoʻnalishi:</label>
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="masalan: Islom Moliyasi, Buxgalteriya"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-400 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono-code text-slate-300">Tajriba darajasi:</label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="masalan: 5 yillik amaliyot"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-teal-400 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono-code text-slate-300">Qisqacha taʼlim tajribangiz (Bio):</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Pedagogik va amaliy tajribangiz haqida..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-teal-400 outline-none resize-none"
                  />
                </div>
                <p className="text-[11px] text-teal-200/80 leading-tight">
                  ★ Eslatma: Oʻqituvchi arizasi xavfsizlik maqsadida Bosh Administrator tomonidan koʻrib chiqiladi va tasdiqlangach dars qoʻshish imkoniyati ochiladi.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-modern-primary py-3.5 px-6 text-sm font-bold font-mono-code flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 mt-2"
            >
              <span>Roʻyxatdan Oʻtish & Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Quick 1-Click Demo Accounts Bar for Instant Testing */}
        <div className="mt-7 pt-5 border-t border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400">
            <span className="font-bold uppercase tracking-wider text-amber-400">
              Tezkor Sinov Hisoblari (1-Click Test):
            </span>
            <span className="text-slate-500">Parol: admin / 123</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Admin 1 */}
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin({
                  id: 'usr_admin_1',
                  name: 'Admin 1',
                  email: 'admin1@moliya.uz',
                  password: 'admin',
                  role: 'admin',
                  registeredDate: '01.08.2026'
                })
              }
              className="p-2 rounded-xl border border-rose-500/40 bg-slate-900/80 text-left transition-all hover:bg-rose-950/40 cursor-pointer"
            >
              <div className="text-[10px] font-mono-code font-bold text-rose-300 truncate">
                👑 Admin 1
              </div>
              <div className="text-xs font-semibold text-white truncate mt-0.5">
                admin1@moliya.uz
              </div>
            </button>

            {/* Admin 2 */}
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin({
                  id: 'usr_admin_2',
                  name: 'Admin 2',
                  email: 'admin2@moliya.uz',
                  password: 'admin',
                  role: 'admin',
                  registeredDate: '02.08.2026'
                })
              }
              className="p-2 rounded-xl border border-rose-500/40 bg-slate-900/80 text-left transition-all hover:bg-rose-950/40 cursor-pointer"
            >
              <div className="text-[10px] font-mono-code font-bold text-rose-300 truncate">
                👑 Admin 2
              </div>
              <div className="text-xs font-semibold text-white truncate mt-0.5">
                admin2@moliya.uz
              </div>
            </button>

            {/* Approved Teacher */}
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin({
                  id: 'usr_teacher_1',
                  name: 'Muhammadali U.',
                  email: 'muhammadali@moliya.uz',
                  password: '123',
                  role: 'teacher',
                  teacherStatus: 'approved',
                  registeredDate: '05.08.2026'
                })
              }
              className="p-2 rounded-xl border border-teal-500/40 bg-slate-900/80 text-left transition-all hover:bg-teal-950/40 cursor-pointer"
            >
              <div className="text-[10px] font-mono-code font-bold text-teal-300 truncate">
                👨‍🏫 Ustoz
              </div>
              <div className="text-xs font-semibold text-white truncate mt-0.5">
                Muhammadali
              </div>
            </button>

            {/* Student */}
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin({
                  id: 'usr_student_1',
                  name: 'Sarvinoz M.',
                  email: 'sarvinoz@student.uz',
                  password: '123',
                  role: 'student',
                  registeredDate: '15.08.2026'
                })
              }
              className="p-2 rounded-xl border border-cyan-500/40 bg-slate-900/80 text-left transition-all hover:bg-cyan-950/40 cursor-pointer"
            >
              <div className="text-[10px] font-mono-code font-bold text-cyan-300 truncate">
                👨‍🎓 Oʻquvchi
              </div>
              <div className="text-xs font-semibold text-white truncate mt-0.5">
                Sarvinoz M.
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
