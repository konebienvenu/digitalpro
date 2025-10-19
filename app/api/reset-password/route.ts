import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { updateUserPassword } from '../../../lib/auth-login';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ message: 'Token et mot de passe requis' }, { status: 400 });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as { email: string; otp: string };
    } catch (err) {
      return NextResponse.json({ message: 'Token invalide ou expiré' }, { status: 401 });
    }

    // Mettre à jour le mot de passe dans la base de données
    await updateUserPassword(payload.email, password);

    return NextResponse.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err: any) {
    console.error('Erreur reset-password:', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
