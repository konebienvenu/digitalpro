import { NextRequest, NextResponse } from 'next/server';
import { saveFeedback, getAllFeedbacks } from '@/lib/feedback-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      rating_accueil,
      rating_food,
      rating_atmosphere,
      rating_value,
      category,
      comment
    } = body;

    // Validation : name et comment ne sont plus obligatoires
    if (
      !category ||
      typeof rating_accueil !== 'number' ||
      typeof rating_food !== 'number' ||
      typeof rating_atmosphere !== 'number' ||
      typeof rating_value !== 'number'
    ) {
      return NextResponse.json(
        { success: false, message: 'Champs invalides ou manquants.' },
        { status: 400 }
      );
    }

    const average_rating = (
      rating_accueil +
      rating_food +
      rating_atmosphere +
      rating_value
    ) / 4;

    const feedback = {
      name: name || '',           // valeur par défaut vide
      comment: comment || '',     // valeur par défaut vide
      rating_accueil,
      rating_food,
      rating_atmosphere,
      rating_value,
      average_rating,
      category
    };

    const insertedId = await saveFeedback(feedback);

    return NextResponse.json({ success: true, id: insertedId }, { status: 201 });

  } catch (error) {
    console.error('Erreur POST /api/feedback:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await getAllFeedbacks();
    return NextResponse.json({ success: true, feedbacks });
  } catch (error) {
    console.error('Erreur GET /api/feedback:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des avis.' },
      { status: 500 }
    );
  }
}
