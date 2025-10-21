// lib/admin-service.ts

export async function verifySecurityAnswer(restaurantName: string, recoveryCode: string) {
  console.log(`[admin-service] Vérification du code pour: ${restaurantName}`);
  // Simule une vérification
  return recoveryCode === "12345";
}

export async function updateAdminPassword(email: string, newPassword: string) {
  console.log(`[admin-service] Mise à jour du mot de passe pour: ${email}`);
  // Simule une mise à jour (dans la vraie vie tu appellerais ta base de données ici)
  return true; // Indique que la mise à jour s’est bien passée
}
