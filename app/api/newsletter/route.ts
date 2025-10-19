import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';
import crypto from 'crypto';

export interface NewsletterData {
  firstName: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const body: NewsletterData = await req.json();
    const { firstName, email } = body;

    if (!firstName || !email) {
      return NextResponse.json({ message: 'Prénom et email requis' }, { status: 400 });
    }

    const subscribers = await executeQuery(
      'SELECT id, confirmed, last_sent_at, token FROM newsletter_subscribers WHERE email = ?',
      [email]
    ) as { id: number; confirmed: number; last_sent_at: Date | null; token: string }[];

    const now = new Date();

    // Si déjà confirmé
    if (subscribers.length > 0 && subscribers[0].confirmed === 1) {
      return NextResponse.json({
        message: 'Vous êtes déjà inscrit à la newsletter.',
        status: 'already'
      }, { status: 409 });
    }

    // Si déjà enregistré mais non confirmé
    if (subscribers.length > 0 && subscribers[0].confirmed === 0) {
      const subscriber = subscribers[0];
      let shouldSendEmail = true;

      if (subscriber.last_sent_at) {
        const lastSent = new Date(subscriber.last_sent_at);
        const hoursSinceLastSent = (now.getTime() - lastSent.getTime()) / 1000 / 3600;
        if (hoursSinceLastSent < 24) {
          shouldSendEmail = false; // on n’envoie pas si moins de 24h
        }
      }

      if (shouldSendEmail) {
        const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter-confirmed?token=${subscriber.token}`;

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-newsletter-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: email, firstName, confirmUrl }),
        });

        // Mise à jour last_sent_at
        await executeQuery(
          'UPDATE newsletter_subscribers SET last_sent_at = NOW() WHERE id = ?',
          [subscriber.id]
        );
      }

      return NextResponse.json({
        message: "Vous êtes déjà inscrit à la newsletter, mais votre adresse n'est pas encore confirmée. Vérifiez votre boîte mail pour confirmer votre inscription.",
        status: 'already_pending'
      }, { status: 409 });
    }

    // Nouvel abonné
    const token = crypto.randomBytes(32).toString('hex');

    await executeQuery(
      `INSERT INTO newsletter_subscribers (first_name, email, token, confirmed, created_at)
       VALUES (?, ?, ?, 0, NOW())`,
      [firstName, email, token]
    );

    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter-confirmed?token=${token}`;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-newsletter-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, firstName, confirmUrl }),
    });

    return NextResponse.json({
      message: 'Inscription réussie ! Veuillez vérifier votre email pour confirmer votre newsletter.',
      status: 'success'
    }, { status: 201 });

  } catch (err: any) {
    console.error('Erreur API newsletter :', err);
    return NextResponse.json({ message: err.message || 'Erreur serveur', status: 'error' }, { status: 500 });
  }
}
