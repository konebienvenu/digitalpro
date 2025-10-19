// lib/feedback-service.ts

export interface Feedback {
  name: string;
  comment: string;
  rating_accueil: number;
  rating_food: number;
  rating_atmosphere: number;
  rating_value: number;
  average_rating: number;
  category: string;
}


/**
 * Retourne tous les feedbacks (placeholder)
 */
export async function getAllFeedbacks(): Promise<Feedback[]> {
  // Ici on retourne un tableau vide pour l'instant
  return [];
}

/**
 * Enregistre un feedback (placeholder)
 */
export async function saveFeedback(feedback: Feedback): Promise<{ success: boolean }> {
  // Simule l'enregistrement et retourne success=true
  return { success: true };
}
