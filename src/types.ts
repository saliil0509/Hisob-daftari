export interface MicroQuiz {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonPlanStep {
  id: string;
  order: number;
  title: string;
  timeEst: string;
  category: 'nazariya' | 'formula' | 'keys' | 'quiz' | 'audit';
  description: string;
  keyPoints?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  dur: string;
  videoPlaceholderUrl?: string;
  youtubeUrl?: string;
  text: string;
  keyTakeaways?: string[];
  reja?: LessonPlanStep[];
  interactiveTool?:
    | 'demand_supply'
    | 'compound_interest'
    | 'budget_50_30_20'
    | 'balance_equation'
    | 'break_even'
    | 'unit_economics'
    | 'islamic_murabaha'
    | 'zakat_calculator';
  quizzes: [MicroQuiz, MicroQuiz];
  task: string;
  sampleKeywords?: string[];
  authorTeacher?: string;
  createdAt?: string;
}

export interface Field {
  id: string;
  num: string;
  name: string;
  tag: string;
  desc: string;
  lessons: Lesson[];
  estimatedWeeks?: number;
  level?: string;
}

export interface AudioQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardCapital: number;
}

export type VideoQuiz = AudioQuiz;

export interface MediaItem {
  id: string;
  kind: 'Video' | 'Podkast';
  title: string;
  desc: string;
  duration: string;
  speaker?: string;
  youtubeUrl?: string;
  videoCategory?: string;
  audioQuiz: AudioQuiz;
  videoQuiz?: VideoQuiz;
  createdAt?: string;
}

export interface CriteriaBreakdown {
  conceptAccuracy: {
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
    title: string;
    note: string;
  };
  logicalApproach: {
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
    title: string;
    note: string;
  };
  practicalExamples: {
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
    title: string;
    note: string;
  };
}

export interface LessonProgress {
  completed: boolean;
  quizPassed: boolean;
  quizAnswers: { [quizId: string]: number };
  answer: string;
  aiScore: number | null;
  aiFeedback: string;
  criteria?: CriteriaBreakdown;
  auditedAt?: string;
  completedSteps?: string[];
}

export interface StudyPlanConfig {
  dailyTargetMinutes: number;
  weeklyLessonsGoal: number;
  weeklyDays?: number;
  preferredFieldId?: string;
  targetGoal?: string;
  preferredTime: 'ertalab' | 'kunduzi' | 'kechqurun';
  targetFinishDays: number;
  startDate?: string;
}

export interface UserProfile {
  name: string;
  passportId: string;
  registeredDate: string;
  passiveCapital: number;
  streak: number;
  lastActiveDate: string;
  solvedAudioQuizzes: string[];
  notificationsRead: boolean;
  studyPlan?: StudyPlanConfig;
  lastVisitedLesson?: {
    fieldId: string;
    lessonId: string;
    title: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  lessonsDone: number;
  totalLessons: number;
  avgScore: number;
  capital: number;
  isCurrentUser?: boolean;
}

export type UserRole = 'student' | 'teacher' | 'admin';
export type TeacherStatus = 'pending' | 'approved' | 'rejected';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  specialty?: string;
  experience?: string;
  teacherStatus?: TeacherStatus;
  registeredDate: string;
  bio?: string;
  assignedFieldId?: string;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'user' | 'teacher' | 'content' | 'audit' | 'system';
  actorName: string;
}
