import { executeQuery } from './database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Modification pour test : 1 minute sans Remember Me, 2 minutes avec Remember Me
const getTokenExpiration = (rememberMe?: boolean) => rememberMe ? '7d' : '1h';

export function generateToken(userId: number, role: string, rememberMe?: boolean): string {
  return jwt.sign(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: getTokenExpiration(rememberMe) }
  );
}

export async function loginUser(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const { email, password, rememberMe } = credentials;

  console.log('Remember me:', rememberMe); // pour tester la valeur

  const users = await executeQuery(
    `SELECT id, email, password_hash, first_name, last_name, organization_type, role, email_verified, created_at
     FROM users WHERE email = ?`,
    [email]
  ) as any[];

  if (users.length === 0) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const user = users[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  if (!user.email_verified) {
    throw new Error("Votre adresse email n'est pas encore vérifiée. Veuillez vérifier votre boîte mail.");
  }

  const token = generateToken(user.id, user.role, rememberMe);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      organizationType: user.organization_type,
      role: user.role,
      emailVerified: !!user.email_verified,
      createdAt: user.created_at,
    },
    token,
  };
}

// =====================
// Nouvelle fonction pour réinitialiser le mot de passe
// =====================
export async function updateUserPassword(email: string, newPassword: string) {
  // Hasher le mot de passe avant de le stocker
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Mettre à jour le mot de passe dans la base
  await executeQuery(
    `UPDATE users SET password_hash = ? WHERE email = ?`,
    [hashedPassword, email]
  );

  console.log(`Mot de passe de ${email} mis à jour avec succès.`);
}
