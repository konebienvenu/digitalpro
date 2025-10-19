import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { token, code } = await req.json();

    if (!token || !code) {
      return NextResponse.json({ message: 'Token et code sont requis' }, { status: 400 });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as { email: string; otp: string };
    } catch (err) {
      return NextResponse.json({ message: 'Token invalide ou expiré' }, { status: 401 });
    }

    if (payload.otp !== code) {
      return NextResponse.json({ message: 'Code OTP invalide' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Code vérifié avec succès' });

  } catch (err: any) {
    console.error('Erreur verify-otp:', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
