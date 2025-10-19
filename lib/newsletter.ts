import { executeQuery } from './database';
import crypto from 'crypto';

export interface NewsletterSubscriber {
  id: number;
  email: string;
  firstName: string;
  confirmed: boolean;
  createdAt: string;
}

export interface NewsletterData {
  firstName: string;
  email: string;
}

export async function subscribeNewsletter(data: NewsletterData): Promise<{ subscriber: NewsletterSubscriber; message: string; resendConfirmation?: boolean }> {
  const { firstName, email } = data;

  if (!firstName || !email) {
    throw new Error('Prénom et email requis.');
  }

  const existing = await executeQuery(
    'SELECT id, confirmed, token FROM newsletter_subscribers WHERE email = ?',
    [email]
  ) as { id: number; confirmed: number; token: string }[];

  if (existing.length > 0) {
    const existingUser = existing[0];

    if (existingUser.confirmed) {
      return {
        subscriber: {
          id: existingUser.id,
          email,
          firstName,
          confirmed: true,
          createdAt: new Date().toISOString(),
        },
        message: 'Vous êtes déjà inscrit à la newsletter.',
      };
    } else {
      const token = crypto.randomBytes(32).toString('hex');
      await executeQuery(
        'UPDATE newsletter_subscribers SET token = ?, created_at = NOW() WHERE id = ?',
        [token, existingUser.id]
      );

      // ✅ Ici, on pointe directement vers la PAGE React
      const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter-confirmed?token=${token}`;

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-newsletter-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, firstName, confirmUrl }),
      });

      return {
        subscriber: {
          id: existingUser.id,
          email,
          firstName,
          confirmed: false,
          createdAt: new Date().toISOString(),
        },
        message: 'Votre email est déjà inscrit mais non confirmé. Un nouvel email de confirmation a été envoyé.',
        resendConfirmation: true,
      };
    }
  }

  const token = crypto.randomBytes(32).toString('hex');
  const result = await executeQuery(
    `INSERT INTO newsletter_subscribers (first_name, email, token, confirmed, created_at)
     VALUES (?, ?, ?, 0, NOW())`,
    [firstName, email, token]
  ) as { insertId: number };

  // ✅ Ici aussi, on pointe vers la PAGE React
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter-confirmed?token=${token}`;

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-newsletter-confirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: email, firstName, confirmUrl }),
  });

  const newSubscriber: NewsletterSubscriber = {
    id: result.insertId,
    email,
    firstName,
    confirmed: false,
    createdAt: new Date().toISOString(),
  };

  return { subscriber: newSubscriber, message: 'Inscription réussie ! Veuillez vérifier votre email pour confirmer.' };
}
