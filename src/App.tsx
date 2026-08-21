import React, { useState, useEffect } from 'react';
import {
  Field,
  Lesson,
  LessonProgress,
  UserProfile,
  StudyPlanConfig,
  AuthUser,
  ActivityLogItem,
  MediaItem
} from './types';
import { FIELDS as DEFAULT_FIELDS, MEDIA as DEFAULT_MEDIA } from './data/learningData';
import { INITIAL_USERS, INITIAL_ACTIVITY_LOGS } from './data/authData';
import { TopBar } from './components/TopBar';
import { HomeView } from './components/HomeView';
import { FieldView } from './components/FieldView';
import { LessonView } from './components/LessonView';
import { PassiveView } from './components/PassiveView';
import { PassportView } from './components/PassportView';
import { StudyPlanModal } from './components/StudyPlanModal';
import { AuthModal } from './components/AuthModal';
import { AdminView } from './components/AdminView';
import { TeacherView } from './components/TeacherView';

const STORAGE_PROGRESS_KEY = 'hisob_daftari_progress_v2';
const STORAGE_PROFILE_KEY = 'hisob_daftari_profile_v2';
const STORAGE_USERS_KEY = 'hisob_daftari_users_v2';
const STORAGE_AUTH_USER_KEY = 'hisob_daftari_current_user_v2';
const STORAGE_FIELDS_KEY = 'hisob_daftari_fields_v2';
const STORAGE_MEDIA_KEY = 'hisob_daftari_media_v2';
const STORAGE_LOGS_KEY = 'hisob_daftari_logs_v2';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Sarvinoz Muzaffarovna',
  passportId: 'UZ-AUDIT-2026-8849',
  registeredDate: '15.08.2026',
  passiveCapital: 50,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  solvedAudioQuizzes: ['m1'],
  notificationsRead: false,
  studyPlan: {
    dailyTargetMinutes: 20,
    weeklyLessonsGoal: 4,
    weeklyDays: 5,
    preferredFieldId: 'all',
    targetGoal: 'professional',
    preferredTime: 'kechqurun',
    targetFinishDays: 14,
    startDate: new Date().toLocaleDateString('uz-UZ')
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Data States with Persistent Storage
  const [fields, setFields] = useState<Field[]>(DEFAULT_FIELDS);
  const [mediaList, setMediaList] = useState<MediaItem[]>(DEFAULT_MEDIA);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(INITIAL_USERS[4]); // Default to student
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFields = localStorage.getItem(STORAGE_FIELDS_KEY);
      if (savedFields) {
        setFields(JSON.parse(savedFields));
      }

      const savedMedia = localStorage.getItem(STORAGE_MEDIA_KEY);
      if (savedMedia) {
        setMediaList(JSON.parse(savedMedia));
      }

      const savedProgress = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }

      const savedProfile = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setUserProfile({
          ...DEFAULT_PROFILE,
          ...parsed,
          studyPlan: parsed.studyPlan || DEFAULT_PROFILE.studyPlan
        });
      }

      const savedUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (savedUsers) {
        setRegisteredUsers(JSON.parse(savedUsers));
      }

      const savedCurrentUser = localStorage.getItem(STORAGE_AUTH_USER_KEY);
      if (savedCurrentUser) {
        setCurrentUser(JSON.parse(savedCurrentUser));
      } else {
        // First time visitor prompt auth
        setIsAuthModalOpen(true);
      }

      const savedLogs = localStorage.getItem(STORAGE_LOGS_KEY);
      if (savedLogs) {
        setActivityLogs(JSON.parse(savedLogs));
      }
    } catch (e) {
      console.warn('LocalStorage yuklashda xatolik:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage upon state updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_FIELDS_KEY, JSON.stringify(fields));
    } catch (e) {
      console.warn('Fields saqlashda xatolik:', e);
    }
  }, [fields, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_MEDIA_KEY, JSON.stringify(mediaList));
    } catch (e) {
      console.warn('Media saqlashda xatolik:', e);
    }
  }, [mediaList, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Progressni saqlashda xatolik:', e);
    }
  }, [progress, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Profilni saqlashda xatolik:', e);
    }
  }, [userProfile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn('Users saqlashda xatolik:', e);
    }
  }, [registeredUsers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_AUTH_USER_KEY);
      }
    } catch (e) {
      console.warn('Current user saqlashda xatolik:', e);
    }
  }, [currentUser, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(activityLogs));
    } catch (e) {
      console.warn('Logs saqlashda xatolik:', e);
    }
  }, [activityLogs, isLoaded]);

  // Helper: Log Activity
  const logActivity = (
    action: string,
    details: string,
    type: ActivityLogItem['type'],
    actorName: string
  ) => {
    const newLog: ActivityLogItem = {
      id: `log_${Date.now()}`,
      action,
      details,
      timestamp: new Date().toLocaleString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      type,
      actorName
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Streak update calculation upon completing a lesson
  const updateStreakOnCompletion = () => {
    const today = new Date().toISOString().split('T')[0];
    setUserProfile((prev) => {
      if (prev.lastActiveDate === today) {
        return prev;
      }
      return {
        ...prev,
        streak: prev.streak + 1,
        lastActiveDate: today
      };
    });
  };

  const handleNavigate = (view: string, fieldId?: string, lessonId?: string) => {
    setCurrentView(view);
    if (fieldId) setActiveFieldId(fieldId);
    if (lessonId) setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSaveLessonProgress = (
    fieldId: string,
    lessonId: string,
    updated: Partial<LessonProgress>
  ) => {
    const key = `${fieldId}:${lessonId}`;
    setProgress((prev) => {
      const current = prev[key] || {
        completed: false,
        quizPassed: false,
        quizAnswers: {},
        answer: '',
        aiScore: null,
        aiFeedback: ''
      };
      const merged = { ...current, ...updated };

      if (updated.completed && !current.completed) {
        updateStreakOnCompletion();
        const currentFieldName = fields.find((f) => f.id === fieldId)?.name || fieldId;
        logActivity(
          'Dars yakunlandi',
          `${userProfile.name} "${currentFieldName}" boʻyicha darsni muvaffaqiyatli yakunladi.`,
          'audit',
          userProfile.name
        );
      }

      return {
        ...prev,
        [key]: merged
      };
    });
  };

  const handleRewardCapital = (mediaId: string, capital: number) => {
    setUserProfile((prev) => {
      if (prev.solvedAudioQuizzes.includes(mediaId)) return prev;
      logActivity(
        'Passiv kapital olindi',
        `${userProfile.name} audio podkast orqali +${capital} kapital ishlab oldi.`,
        'user',
        userProfile.name
      );
      return {
        ...prev,
        passiveCapital: prev.passiveCapital + capital,
        solvedAudioQuizzes: [...prev.solvedAudioQuizzes, mediaId]
      };
    });
  };

  const handleUpdateUserName = (newName: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name: newName
    }));
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, name: newName } : prev));
      setRegisteredUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? { ...u, name: newName } : u))
      );
    }
  };

  const handleSaveStudyPlan = (newPlan: StudyPlanConfig) => {
    setUserProfile((prev) => ({
      ...prev,
      studyPlan: newPlan
    }));
  };

  // Auth Handlers
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserProfile((prev) => ({
      ...prev,
      name: user.name
    }));
    setIsAuthModalOpen(false);

    if (user.role === 'admin') {
      setCurrentView('admin');
    } else if (user.role === 'teacher') {
      setCurrentView('teacher');
    } else {
      setCurrentView('home');
    }

    logActivity(
      'Tizimga kirish',
      `${user.name} (${user.role.toUpperCase()}) tizimga muvaffaqiyatli kirdi.`,
      'user',
      user.name
    );
  };

  const handleRegisterUser = (newUser: AuthUser) => {
    setRegisteredUsers((prev) => [...prev, newUser]);
    logActivity(
      newUser.role === 'teacher' ? 'Yangi ustoz arizasi' : 'Yangi foydalanuvchi',
      `${newUser.name} ${newUser.role === 'teacher' ? 'ustozlik arizasini yubordi' : 'roʻyxatdan oʻtdi'}.`,
      newUser.role === 'teacher' ? 'teacher' : 'user',
      newUser.name
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthModalOpen(true);
    setCurrentView('home');
  };

  // Teacher Approval / Deletion Handlers (Admin functions)
  const handleAddNewTeacher = (newTeacher: AuthUser) => {
    setRegisteredUsers((prev) => [newTeacher, ...prev]);
    logActivity(
      'Yangi ustoz qoʻshildi',
      `Administrator "${newTeacher.name}" ustozini ${newTeacher.teacherStatus === 'approved' ? 'tasdiqlangan' : 'kutilayotgan'} maqomda qoʻshdi.`,
      'teacher',
      currentUser?.name || 'Admin'
    );
  };

  const handleUpdateTeacherStatus = (userId: string, status: 'approved' | 'rejected') => {
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, teacherStatus: status } : u))
    );
    const target = registeredUsers.find((u) => u.id === userId);
    logActivity(
      status === 'approved' ? 'Ustoz tasdiqlandi' : 'Ustoz arizasi rad etildi',
      `${target?.name || 'Ustoz'} arizasi ${status === 'approved' ? 'tasdiqlandi' : 'rad etildi'}.`,
      'teacher',
      currentUser?.name || 'Admin'
    );
  };

  const handleDeleteUser = (userId: string) => {
    const target = registeredUsers.find((u) => u.id === userId);
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== userId));
    logActivity(
      'Foydalanuvchi oʻchirildi',
      `${target?.name || 'Foydalanuvchi'} tizimdan oʻchirildi.`,
      'system',
      currentUser?.name || 'Admin'
    );
  };

  // Content Management Handlers (Admin functions)
  const handleAddFieldLesson = (fieldId: string, newLesson: Lesson) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? {
              ...f,
              lessons: [...f.lessons, newLesson]
            }
          : f
      )
    );
    const targetField = fields.find((f) => f.id === fieldId);
    logActivity(
      'Yangi dars qoʻshildi',
      `"${targetField?.name}" yoʻnalishiga "${newLesson.title}" darsi qoʻshildi.`,
      'content',
      currentUser?.name || 'Admin'
    );
  };

  const handleUpdateFieldLesson = (fieldId: string, updatedLesson: Lesson) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? {
              ...f,
              lessons: f.lessons.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
            }
          : f
      )
    );
    logActivity(
      'Dars tahrirlandi',
      `"${updatedLesson.title}" darsi maʼlumotlari yangilandi.`,
      'content',
      currentUser?.name || 'Admin'
    );
  };

  const handleDeleteFieldLesson = (fieldId: string, lessonId: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? {
              ...f,
              lessons: f.lessons.filter((l) => l.id !== lessonId)
            }
          : f
      )
    );
    logActivity(
      'Dars oʻchirildi',
      `Dars muvaffaqiyatli oʻchirildi.`,
      'content',
      currentUser?.name || 'Admin'
    );
  };

  const handleAddMediaItem = (newItem: MediaItem) => {
    setMediaList((prev) => [newItem, ...prev]);
    logActivity(
      'Yangi videodars qoʻshildi',
      `"${newItem.title}" nomli yangi video darslik qoʻshildi.`,
      'content',
      currentUser?.name || 'Admin'
    );
  };

  const handleDeleteMediaItem = (mediaId: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== mediaId));
    logActivity(
      'Videodars oʻchirildi',
      `Passiv taʼlim video darsligi oʻchirildi.`,
      'content',
      currentUser?.name || 'Admin'
    );
  };

  // Global calculations
  const totalLessons = fields.reduce((sum, f) => sum + f.lessons.length, 0);
  const totalCompleted = fields.reduce(
    (sum, f) =>
      sum + f.lessons.filter((l) => progress[`${f.id}:${l.id}`]?.completed).length,
    0
  );

  // Active items lookup
  const activeField = fields.find((f) => f.id === activeFieldId) || fields[0];
  const activeLesson =
    activeField.lessons.find((l) => l.id === activeLessonId) ||
    activeField.lessons[0];
  const activeLessonProgress =
    progress[`${activeField.id}:${activeLesson.id}`] || {
      completed: false,
      quizPassed: false,
      quizAnswers: {},
      answer: '',
      aiScore: null,
      aiFeedback: ''
    };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header */}
      <TopBar
        currentView={currentView}
        onNavigate={handleNavigate}
        streakDays={userProfile.streak}
        totalCompleted={totalCompleted}
        totalLessons={totalLessons}
        passiveCapital={userProfile.passiveCapital}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
      />

      {/* Main Views Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {currentView === 'home' && (
          <HomeView
            fields={fields}
            progress={progress}
            onNavigate={handleNavigate}
            streakDays={userProfile.streak}
            passiveCapital={userProfile.passiveCapital}
            studyPlan={userProfile.studyPlan}
            onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
          />
        )}

        {currentView === 'field' && (
          <FieldView
            field={activeField}
            progress={progress}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'lesson' && (
          <LessonView
            field={activeField}
            lesson={activeLesson}
            progress={activeLessonProgress}
            onSaveProgress={handleSaveLessonProgress}
            onNavigate={handleNavigate}
            allFields={fields}
          />
        )}

        {currentView === 'passive' && (
          <PassiveView
            mediaList={mediaList}
            passiveCapital={userProfile.passiveCapital}
            solvedQuizzes={userProfile.solvedAudioQuizzes}
            onRewardCapital={handleRewardCapital}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'progress' && (
          <PassportView
            fields={fields}
            progress={progress}
            userProfile={userProfile}
            onUpdateUserName={handleUpdateUserName}
            onNavigate={handleNavigate}
            onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            currentUser={currentUser || INITIAL_USERS[0]}
            registeredUsers={registeredUsers}
            onAddNewTeacher={handleAddNewTeacher}
            onUpdateTeacherStatus={handleUpdateTeacherStatus}
            onDeleteUser={handleDeleteUser}
            fields={fields}
            onAddFieldLesson={handleAddFieldLesson}
            onUpdateFieldLesson={handleUpdateFieldLesson}
            onDeleteFieldLesson={handleDeleteFieldLesson}
            mediaList={mediaList}
            onAddMediaItem={handleAddMediaItem}
            onDeleteMediaItem={handleDeleteMediaItem}
            activityLogs={activityLogs}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'teacher' && (
          <TeacherView
            currentUser={currentUser || INITIAL_USERS[1]}
            fields={fields}
            progress={progress}
            onAddFieldLesson={handleAddFieldLesson}
            onUpdateFieldLesson={handleUpdateFieldLesson}
            onDeleteFieldLesson={handleDeleteFieldLesson}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Auth Modal (Login / Register / Role switch) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        registeredUsers={registeredUsers}
        onRegisterUser={handleRegisterUser}
        allowClose={currentUser !== null}
      />

      {/* Study Plan Modal */}
      <StudyPlanModal
        isOpen={isStudyPlanOpen}
        onClose={() => setIsStudyPlanOpen(false)}
        plan={
          userProfile.studyPlan || {
            dailyTargetMinutes: 20,
            weeklyLessonsGoal: 4,
            preferredTime: 'kechqurun',
            targetFinishDays: 14,
            startDate: new Date().toLocaleDateString('uz-UZ')
          }
        }
        onSavePlan={handleSaveStudyPlan}
        fields={fields}
        totalCompletedLessons={totalCompleted}
      />

      {/* Modern Footer */}
      <footer className="border-t border-slate-800 bg-[#080c17]/90 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border border-amber-400 text-amber-400 flex items-center justify-center font-display font-bold text-[10px]">
              H
            </div>
            <span>Hisob Daftari — 5 ta yoʻnalish boʻyicha faol va passiv taʼlim platformasi</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold">
              {totalCompleted} / {totalLessons} dars yakunlandi
            </span>
            <span>•</span>
            <span>Intizom: {userProfile.streak} kun 🔥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
