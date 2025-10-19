import { executeQuery } from './database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = '1h';  // Token classique
const CONFIRMATION_TOKEN_EXPIRES = '1m'; // Token test pour email confirmation

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  organizationType: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationType: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: number, role: string): string {
  return jwt.sign(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// === Fonctions pour confirmation email ===
export function generateConfirmationToken(userId: number, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: CONFIRMATION_TOKEN_EXPIRES } // 1 minute pour test
  );
}

export function verifyConfirmationToken(token: string): { userId: number; email: string; expired?: boolean } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return { userId: decoded.userId, email: decoded.email };
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return { userId: 0, email: '', expired: true };
    }
    return null;
  }
}

// === Création utilisateur ===
export async function createUser(userData: RegisterData): Promise<User> {
  const { email, password, firstName, lastName, organizationType } = userData;

  const existingUser = await executeQuery(
    'SELECT id FROM users WHERE email = ?',
    [email]
  ) as { id: number }[];

  if (existingUser.length > 0) {
    throw new Error('Un utilisateur avec cet email existe déjà');
  }

  const passwordHash = await hashPassword(password);

  const result = await executeQuery(
    `INSERT INTO users (email, password_hash, first_name, last_name, organization_type, email_verified)
     VALUES (?, ?, ?, ?, ?, 0)`,
    [email, passwordHash, firstName, lastName, organizationType]
  ) as { insertId: number };

  const newUser = await executeQuery(
    'SELECT id, email, first_name, last_name, organization_type, role, email_verified, created_at FROM users WHERE id = ?',
    [result.insertId]
  ) as any[];

  const user = newUser[0];

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    organizationType: user.organization_type,
    role: user.role,
    emailVerified: !!user.email_verified,
    createdAt: user.created_at,
  };
}
