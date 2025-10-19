// api/verify-email/route.ts
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token requis' }, { status: 400 });
    }

    // Vérifier et décoder le token JWT
    let payload: { userId: number; email?: string } | null = null;
    try {
      payload = jwt.verify(token, JWT_SECRET) as { userId: number; email?: string };
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return NextResponse.json(
          {
            message:
              'Le lien de confirmation a expiré. Veuillez retourner à la page d’accueil pour vous reconnecter ou vous réinscrire afin de recevoir un nouveau mail de confirmation.',
          },
          { status: 401 }
        );
      }
      return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }

    const userId = payload.userId;

    // Vérifier si l'utilisateur existe et n'est pas déjà vérifié
    const users = (await executeQuery(
      'SELECT email_verified FROM users WHERE id = ?',
      [userId]
    )) as any[];

    if (users.length === 0) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const user = users[0];

    // **Ici on change le code HTTP si déjà confirmé**
    if (user.email_verified) {
      return NextResponse.json({ message: 'Email déjà confirmé.' }, { status: 409 });
    }

    // Mettre à jour la vérification email en base
    await executeQuery('UPDATE users SET email_verified = 1 WHERE id = ?', [userId]);

    return NextResponse.json({ message: 'Email confirmé avec succès' }, { status: 200 });
  } catch (err: any) {
    console.error('Erreur verify-email:', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
