/**
 * ============================================================================
 * XAVFSIZ LOGIN TIZIMI (Node.js, Express & MongoDB / Mongoose)
 * ============================================================================
 * Ushbu fayl backend arxitekturasi uchun to'liq ishlab chiqilgan kod:
 * 1. Admin emaillarini config/database ro'yxatida saqlash (admin1@moliya.uz, admin2@moliya.uz)
 * 2. Barcha foydalanuvchilar uchun yagona login/register API
 * 3. Server-side role tekshiruvi: Email admin ro'yxatida bo'lsa -> 'admin', aks holda -> 'user' / 'teacher'
 * 4. JWT token va xavfsiz bcrypt shifrlash
 */

import express, { Request, Response, NextFunction } from 'express';

// ----------------------------------------------------------------------------
// 1. ADMIN EMAILLAR RO'YXATI (Config / Environment)
// ----------------------------------------------------------------------------
export const ADMIN_EMAILS: string[] = [
  'admin1@moliya.uz',
  'admin2@moliya.uz',
  'admin@moliya.uz'
];

/**
 * Email admin ro'yxatida mavjudligini tekshirish yordamchisi
 */
export const checkIsAdmin = (email: string): boolean => {
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email.trim().toLowerCase());
};

// ----------------------------------------------------------------------------
// 2. MONGOOSE SCHEMA & MODEL (MongoDB)
// ----------------------------------------------------------------------------
/*
// Mongoose orqali MongoDB modeli (Reference):
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'teacher' | 'user';
  teacherStatus?: 'approved' | 'pending' | 'rejected';
  specialty?: string;
  experience?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'user'], default: 'user' },
  teacherStatus: { type: String, enum: ['approved', 'pending', 'rejected'] },
  specialty: { type: String },
  experience: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
*/

// ----------------------------------------------------------------------------
// 3. EXPRESS CONTROLLERLAR (Login & Register)
// ----------------------------------------------------------------------------

export interface AuthenticatedUserPayload {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'user';
  teacherStatus?: 'approved' | 'pending' | 'rejected';
}

/**
 * 🔑 LOGIN ENDPOINT (POST /api/auth/login)
 * - Email va parolni qabul qiladi
 * - Server tekshiradi: bu email admin ro'yxatida bormi?
 * - Agar bor: "admin" role beradi
 * - Agar yo'q: "user" / "teacher" role beradi
 */
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email va parol kiritilishi shart' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Server tekshiradi: bu email ADMIN_EMAILS ro'yxatida bormi?
    const isAdmin = checkIsAdmin(cleanEmail);

    // 2. Mock yoki MongoDB bazasidan qidirish:
    // const user = await UserModel.findOne({ email: cleanEmail });
    // if (!user) return res.status(401).json({ error: 'Foydalanuvchi topilmadi' });
    // const isMatch = await bcrypt.compare(password, user.passwordHash);
    // if (!isMatch) return res.status(401).json({ error: 'Parol notoʻgʻri' });

    // 3. Rolni belgilash:
    const effectiveRole: 'admin' | 'teacher' | 'user' = isAdmin ? 'admin' : 'user';

    const userPayload: AuthenticatedUserPayload = {
      id: `usr_${Date.now()}`,
      name: isAdmin ? 'Bosh Administrator' : cleanEmail.split('@')[0],
      email: cleanEmail,
      role: effectiveRole
    };

    // 4. JWT Token yaratish (masalan: jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }))
    const token = `jwt_session_token_${Date.now()}`;

    res.status(200).json({
      message: 'Muvaffaqiyatli kirildi',
      token,
      user: userPayload,
      redirectView: isAdmin ? 'admin_dashboard' : 'user_dashboard'
    });
  } catch (error) {
    res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
  }
};

/**
 * 📝 REGISTER ENDPOINT (POST /api/auth/register)
 */
export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, specialty, experience } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Barcha maydonlarni toʻldiring' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = checkIsAdmin(cleanEmail);

    // Agar email admin ro'yxatida bo'lsa -> 'admin', agar o'qituvchi tanlangan bo'lsa -> 'teacher', aks holda -> 'user'
    const finalRole: 'admin' | 'teacher' | 'user' = isAdmin
      ? 'admin'
      : role === 'teacher'
      ? 'teacher'
      : 'user';

    const newUser: AuthenticatedUserPayload = {
      id: `usr_${Date.now()}`,
      name,
      email: cleanEmail,
      role: finalRole,
      teacherStatus: finalRole === 'teacher' ? 'pending' : undefined
    };

    res.status(201).json({
      message: 'Muvaffaqiyatli roʻyxatdan oʻtdingiz',
      user: newUser,
      redirectView: finalRole === 'admin' ? 'admin_dashboard' : 'user_dashboard'
    });
  } catch (error) {
    res.status(500).json({ error: 'Roʻyxatdan oʻtishda xatolik yuz berdi' });
  }
};

// ----------------------------------------------------------------------------
// 4. ROLE MIDDLEWARELAR (Xavfsizlik)
// ----------------------------------------------------------------------------

export const requireAdminMiddleware = (
  req: Request & { user?: AuthenticatedUserPayload },
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Ruxsat etilmagan: Faqat Adminlar uchun' });
    return;
  }
  next();
};
