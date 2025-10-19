import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Resend } from 'resend';

// Initialise ton client Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction interne pour envoyer un email (pas besoin de fichier séparé)
async function sendEmail(to: string, subject: string, html: string) {
  try {
    await resend.emails.send({
      from: 'noreply@digitalprolearning.online',
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}

export async function POST(req: Request) {
  const { to } = await req.json();

  if (!to) {
    return NextResponse.json({ status: 'error', message: 'Email requis' }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Vérifie si l’utilisateur existe
  const [rows]: any = await connection.execute('SELECT * FROM users WHERE email = ?', [to]);
  const user = rows[0];
  await connection.end();

  if (!user) {
    return NextResponse.json(
      { status: 'not-registered', message: "Cet email n'est pas inscrit." },
      { status: 400 }
    );
  }

  if (!user.email_verified) {
    return NextResponse.json(
      { status: 'not-verified', message: 'Veuillez vérifier votre adresse email avant de continuer.' },
      { status: 400 }
    );
  }

  // Génère OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Prépare le contenu de l’email
  const subject = 'Votre code de réinitialisation Digital Pro Learning';
const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Header jaune -->
      <div style="background-color: #e8b900; padding: 20px; text-align: center;">
        <h1 style="
          margin: 0;
          font-size: 24px; 
          line-height: 1.2; 
          color: #111; 
          font-weight: bold;
          word-break: break-word;
        ">
          Réinitialisation du mot de passe
        </h1>
      </div>

      <!-- Contenu principal -->
      <div style="padding: 30px; color: #111827; text-align: center;">
        <p style="font-size: 18px; margin-bottom: 16px;">Bonjour,</p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
          Voici votre code de réinitialisation à 6 chiffres :<br />
          <strong style="font-size: 32px; letter-spacing: 8px;">${otp}</strong>
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Ce code est valide pendant 10 minutes.<br />
          Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet email.
        </p>
      </div>

      <!-- Footer jaune -->
      <div style="background-color: #e8b900; padding: 15px; text-align: center; font-size: 14px; color: #111;">
        © 2025 Digital Pro Learning - Tous droits réservés
      </div>

    </div>
  </div>
`;


  // Envoie OTP par email
  const result = await sendEmail(to, subject, html);

  if (!result.success) {
    return NextResponse.json({ status: 'error', message: 'Erreur lors de l’envoi de l’email' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', message: 'OTP envoyé !' });
}
