import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { to, firstName, confirmUrl } = await req.json();

  if (!to || !confirmUrl) {
    return NextResponse.json({ message: 'Email et confirmUrl requis' }, { status: 400 });
  }

  const subject = 'Merci de vous être inscrit à notre Newsletter !';
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #e8b900; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Bienvenue !</h1>
        </div>
        <div style="padding: 30px; color: #111827;">
          <p style="font-size: 18px; margin-bottom: 16px;">
            Bonjour <strong>${firstName || 'cher(e) abonné(e)'}</strong>,
          </p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Merci de vous être inscrit à notre newsletter.<br/>
            Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous :
          </p>
          <p style="text-align: center;">
            <a href="${confirmUrl}" 
               style="display: inline-block; background-color: #e8b900; color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px;">
              Confirmer mon inscription
            </a>
          </p>
          <p style="margin-top: 32px; font-size: 14px; color: #6b7280;">
            Si vous n'avez pas demandé cette newsletter, vous pouvez ignorer cet email.
          </p>
        </div>
        <div style="background-color: #e8b900; padding: 15px; text-align: center; font-size: 14px; color: #4b5563;">
          © 2025 Digital Pro Learning - Tous droits réservés
        </div>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'newsletter@digitalprolearning.online',
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ message: 'Erreur lors de l’envoi de l’email', error }, { status: 500 });
  }

  return NextResponse.json({ message: 'Email de confirmation envoyé avec succès' });
}
