import { NextResponse } from 'next/server';
import { createUser, RegisterData } from '@/lib/auth-register';
import jwt from 'jsonwebtoken';
import { executeQuery } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CONFIRMATION_LIMIT_MINUTES = 24 * 60; // 24 heures

export async function POST(req: Request) {
  try {
    const body: RegisterData = await req.json();
    const { email, password, firstName, lastName, organizationType } = body;

    if (!email || !password || !firstName || !lastName || !organizationType) {
      return NextResponse.json({ message: 'Tous les champs sont requis.' }, { status: 400 });
    }

    const existingUsers = await executeQuery(
      'SELECT id, email_verified, last_confirmation_email FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (existingUsers.length > 0) {
      const user = existingUsers[0];

      if (!user.email_verified) {
        const now = new Date();
        const lastSent = user.last_confirmation_email ? new Date(user.last_confirmation_email) : null;
        const diffMinutes = lastSent ? (now.getTime() - lastSent.getTime()) / (1000 * 60) : Infinity;

        if (diffMinutes >= CONFIRMATION_LIMIT_MINUTES) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' } // Token valide 24 heures
          );

          const confirmUrl = `${BASE_URL}/verify?token=${encodeURIComponent(token)}`;

          try {
            await fetch(`${BASE_URL}/api/send-confirmation-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ to: email, firstName, confirmUrl }),
            });

            await executeQuery(
              'UPDATE users SET last_confirmation_email = NOW() WHERE id = ?',
              [user.id]
            );
          } catch (emailErr) {
            console.error('Erreur serveur email :', emailErr);
          }

          return NextResponse.json({
            message: 'Vous êtes déjà inscrit. Un nouveau mail de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et cliquer sur le bouton pour confirmer votre adresse e-mail.'
          }, { status: 400 });

        } else {
          const nextSendHours = Math.ceil((CONFIRMATION_LIMIT_MINUTES - diffMinutes) / 60);
          return NextResponse.json({
            message: `Vous êtes déjà inscrit. Un mail de confirmation a été envoyé récemment. Veuillez vérifier votre boîte de réception et cliquer sur le bouton pour confirmer votre adresse e-mail. Vous pourrez demander un nouveau mail dans ${nextSendHours} heure(s).`
          }, { status: 400 });
        }
      } else {
        return NextResponse.json({ message: 'Cet email est déjà utilisé.' }, { status: 400 });
      }
    }

    const user = await createUser(body);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' } // Token valide 24 heures
    );

    const confirmUrl = `${BASE_URL}/verify?token=${encodeURIComponent(token)}`;

    try {
      await fetch(`${BASE_URL}/api/send-confirmation-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, firstName, confirmUrl }),
      });

      await executeQuery(
        'UPDATE users SET last_confirmation_email = NOW() WHERE id = ?',
        [user.id]
      );

    } catch (emailErr) {
      console.error('Erreur serveur email :', emailErr);
    }

    return NextResponse.json({ message: 'Utilisateur créé avec succès.', user }, { status: 201 });

  } catch (err: any) {
    console.error('Erreur API register :', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
