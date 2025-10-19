// api/verify-newsletter/route.ts
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token requis' }, { status: 400 });
    }

    // Vérifier si le token existe dans la table newsletter_subscribers
    const subscribers = await executeQuery(
      'SELECT id FROM newsletter_subscribers WHERE confirmation_token = ?',
      [token]
    ) as { id: number }[];

    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'Token invalide ou déjà utilisé' }, { status: 401 });
    }

    const subscriberId = subscribers[0].id;

    // Mettre à jour le statut confirmed
    await executeQuery(
      'UPDATE newsletter_subscribers SET confirmed = 1, confirmation_token = NULL WHERE id = ?',
      [subscriberId]
    );

    return NextResponse.json({ message: 'Email de newsletter confirmé avec succès' });

  } catch (err: any) {
    console.error('Erreur verify-newsletter:', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur' }, { status: 500 });
  }
}
