import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME } from '@/lib/middleware';

export const dynamic = 'force-dynamic'; // <-- Important pour résoudre ton erreur

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

interface JwtPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

function verifyToken(token: string): Promise<JwtPayload | null> {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('JWT verification failed:', err.message);
        resolve(null);
      } else {
        resolve(decoded as JwtPayload);
      }
    });
  });
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    console.log('Token reçu dans /api/me:', token);

    if (!token) {
      console.log('Pas de token dans la requête');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await verifyToken(token);
    console.log('Utilisateur décodé:', user);

    if (!user) {
      console.log('Token invalide ou expiré');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user }, { status: 200 });
  } catch (error) {
    console.error('Erreur API /api/me:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
