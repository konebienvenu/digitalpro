import { NextResponse, type NextRequest } from 'next/server';
import { updateAdminPassword } from '../../../lib/admin-service';

export async function POST(request: NextRequest) {
  console.log('[API] /api/update appelé');

  try {
    const { email, newPassword } = await request.json();
    console.log('[API] Données reçues:', { email, newPassword });

    if (!email || !newPassword) {
      console.log('[API] Erreur : email ou nouveau mot de passe manquant');
      return NextResponse.json({ error: 'Email et nouveau mot de passe requis' }, { status: 400 });
    }

    const success = await updateAdminPassword(email, newPassword);

    if (success) {
      console.log('[API] Mot de passe mis à jour avec succès pour', email);
      return NextResponse.json({ message: 'Mot de passe mis à jour avec succès' });
    } else {
      console.log('[API] Échec mise à jour : utilisateur introuvable ou autre erreur');
      return NextResponse.json({ error: 'Utilisateur introuvable ou mise à jour échouée' }, { status: 404 });
    }
  } catch (error) {
    console.error('[API] Erreur dans /api/update :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
