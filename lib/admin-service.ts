// lib/admin-service.ts

/**
 * Vérifie la réponse de sécurité de l'admin (placeholder)
 */
export async function verifySecurityAnswer(answer: string): Promise<boolean> {
  // Placeholder : retourne toujours true
  return true;
}

/**
 * Met à jour le mot de passe de l'admin (placeholder)
 */
export async function updateAdminPassword(newPassword: string): Promise<{ success: boolean }> {
  // Placeholder : retourne success=true
  return { success: true };
}
