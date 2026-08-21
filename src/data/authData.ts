import { AuthUser, ActivityLogItem } from '../types';

export const ADMIN_EMAILS: string[] = [
  'admin1@moliya.uz',
  'admin2@moliya.uz',
  'admin@moliya.uz'
];

export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email.trim().toLowerCase());
};

export const INITIAL_USERS: AuthUser[] = [
  {
    id: 'usr_admin_1',
    name: 'Bosh Administrator 1',
    email: 'admin1@moliya.uz',
    password: 'admin',
    role: 'admin',
    registeredDate: '01.08.2026',
    bio: 'Platforma boshqaruvchisi va kontent kuratori.'
  },
  {
    id: 'usr_admin_2',
    name: 'Bosh Administrator 2',
    email: 'admin2@moliya.uz',
    password: 'admin',
    role: 'admin',
    registeredDate: '02.08.2026',
    bio: 'Xavfsizlik va audit koordinatori.'
  },
  {
    id: 'usr_teacher_1',
    name: 'Muhammadali Eshonqulov',
    email: 'muhammadali@moliya.uz',
    password: '123',
    role: 'teacher',
    specialty: 'Islom Moliyasi va Biznes boshqaruvi',
    experience: '12 yillik tajriba',
    teacherStatus: 'approved',
    registeredDate: '05.08.2026',
    assignedFieldId: 'islom-moliyasi',
    bio: 'Islom moliyasi va tadbirkorlik boʻyicha ekspert-ustoz.'
  },
  {
    id: 'usr_teacher_2',
    name: 'Nodirbek Rustamov',
    email: 'nodirbek@ustoz.uz',
    password: '123',
    role: 'teacher',
    specialty: 'Buxgalteriya va Audit hisobi (CIPA/ACCA)',
    experience: '8 yillik amaliyot',
    teacherStatus: 'pending',
    registeredDate: '18.08.2026',
    assignedFieldId: 'buxgalteriya',
    bio: 'Milliy va xalqaro buxgalteriya standartlari boʻyicha amaliyotchi mutaxassis.'
  },
  {
    id: 'usr_student_1',
    name: 'Sarvinoz Muzaffarovna',
    email: 'sarvinoz@student.uz',
    password: '123',
    role: 'student',
    registeredDate: '15.08.2026',
    bio: 'Moliya va audit yoʻnalishi talabasi.'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'log_1',
    action: 'Platforma ishga tushirildi',
    details: '5 ta yoʻnalish boʻyicha faol va passiv taʼlim darsliklari faollashtirildi.',
    timestamp: '19.08.2026, 09:00',
    type: 'system',
    actorName: 'Tizim'
  },
  {
    id: 'log_2',
    action: 'Xavfsiz login tizimi ishga tushdi',
    details: 'Admin emaillari (admin1@moliya.uz, admin2@moliya.uz) tekshiruvi integratsiya qilindi.',
    timestamp: '19.08.2026, 11:30',
    type: 'system',
    actorName: 'Bosh Administrator'
  },
  {
    id: 'log_3',
    action: 'Yangi ustoz arizasi',
    details: 'Nodirbek Rustamov buxgalteriya yoʻnalishi boʻyicha tasdiq kutmoqda.',
    timestamp: '19.08.2026, 10:15',
    type: 'teacher',
    actorName: 'Nodirbek Rustamov'
  },
  {
    id: 'log_4',
    action: 'Ustoz tasdiqlandi',
    details: 'Muhammadali ustoz arizasi muvaffaqiyatli qabul qilindi.',
    timestamp: '19.08.2026, 10:45',
    type: 'teacher',
    actorName: 'Bosh Administrator'
  },
  {
    id: 'log_5',
    action: 'AI Audit yakunlandi',
    details: 'Sarvinoz Muzaffarovna "Talab va taklif" darsini 92 ballga topshirdi.',
    timestamp: '19.08.2026, 11:00',
    type: 'audit',
    actorName: 'AI Auditor'
  }
];
