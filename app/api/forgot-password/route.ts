import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 chiffres
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "L'email est requis." }, { status: 400 });
    }

    // Générer OTP
    const otp = generateOtp();

    // Créer un token JWT avec email + OTP, expiration 10 minutes
    const token = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: '10m' });

    // Appeler API interne pour envoyer l'email avec le code OTP (attention propriété code)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, code: otp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de l’envoi de l’email de réinitialisation :', errorText);
        return NextResponse.json({ message: 'Erreur lors de l’envoi du mail.' }, { status: 500 });
      }
    } catch (emailErr) {
      console.error('Erreur serveur email :', emailErr);
      return NextResponse.json({ message: 'Erreur serveur mail.' }, { status: 500 });
    }

    // Retourner le token au client si besoin pour vérification
    return NextResponse.json({ message: 'Code envoyé avec succès.', token });

  } catch (err: any) {
    console.error('Erreur API forgot-password :', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
