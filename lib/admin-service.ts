export async function verifySecurityAnswer(restaurantName: string, recoveryCode: string): Promise<boolean> {
  // Simulation d’une vérification (tu peux remplacer ça par une requête DB)
  if (!restaurantName || !recoveryCode) return false;

  // Exemple logique simple (à adapter à ta base de données)
  const storedAnswers = [
    { restaurantName: "Chez Marie", recoveryCode: "1234" },
    { restaurantName: "Le Soleil", recoveryCode: "abcd" },
  ];

  const found = storedAnswers.find(
    (entry) =>
      entry.restaurantName.toLowerCase() === restaurantName.toLowerCase() &&
      entry.recoveryCode === recoveryCode
  );

  return !!found; // retourne true si trouvé
}

export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  // Exemple basique : log + retour succès
  console.log("Mot de passe administrateur mis à jour :", newPassword);
  return true;
}
