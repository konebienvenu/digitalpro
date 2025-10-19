// app/api/reset/route.ts (ou équivalent)

import { NextResponse, type NextRequest } from 'next/server';
import { verifySecurityAnswer } from '../../../lib/admin-service';

export async function POST(request: NextRequest) {
  try {
    const { restaurantName, recoveryCode } = await request.json();

    if (!restaurantName || !recoveryCode) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const valid = await verifySecurityAnswer(restaurantName, recoveryCode);
    if (!valid) {
      return NextResponse.json({ error: 'Réponses incorrectes' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Vérification réussie' });
  } catch (error) {
    console.error('Erreur dans /api/reset:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
