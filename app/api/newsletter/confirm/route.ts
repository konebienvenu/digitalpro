import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { status: 'error', message: 'Token manquant.' },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const subscribers = await executeQuery(
      'SELECT id, confirmed FROM newsletter_subscribers WHERE token = ?',
      [token]
    ) as { id: number; confirmed: number }[];

    if (subscribers.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'Token invalide ou expiré.' },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const subscriber = subscribers[0];

    if (subscriber.confirmed === 1) {
      return NextResponse.json(
        { status: 'already', message: 'Vous avez déjà confirmé votre inscription.' },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    await executeQuery(
      'UPDATE newsletter_subscribers SET confirmed = 1 WHERE id = ?',
      [subscriber.id]
    );

    return NextResponse.json(
      { status: 'success', message: 'Félicitations ! Votre inscription a été confirmée.' },
      { headers: { 'Cache-Control': 'no-store' } }
    );

  } catch (err: any) {
    console.error('Erreur confirmation newsletter :', err);
    return NextResponse.json(
      { status: 'error', message: 'Erreur serveur.' },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
