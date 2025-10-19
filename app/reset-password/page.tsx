'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';

type ModalType = 'success' | 'error';

interface ModalState {
  show: boolean;
  type: ModalType;
  message: string;
}

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'error', message: '' });

  const validatePassword = (pw: string): string | null => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(pw)) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!uppercase.test(pw)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!number.test(pw)) return 'Le mot de passe doit contenir au moins un chiffre';
    if (!specialChar.test(pw)) return 'Le mot de passe doit contenir au moins un caractère spécial';
    return null;
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setModal({ show: true, type: 'error', message: 'Les mots de passe ne correspondent pas' });
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setModal({ show: true, type: 'error', message: validationError });
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setModal({ show: true, type: 'error', message: data.message || 'Erreur lors de la réinitialisation' });
        return;
      }

      setModal({
        show: true,
        type: 'success',
        message: 'Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.',
      });
    } catch (err) {
      setModal({ show: true, type: 'error', message: 'Erreur réseau, réessayez plus tard' });
    }
  };

  const closeModal = () => setModal({ ...modal, show: false });

  const redirectToLogin = () => router.push('/login');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Nouveau mot de passe</h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
        />

        <Button onClick={handleResetPassword} className="w-full">
          Réinitialiser le mot de passe
        </Button>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg text-center relative animate-fadeIn">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-xl"
            >
              ×
            </button>
            <div className="flex justify-center mb-4">
              {modal.type === 'error' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <p className="text-gray-700 mb-6">{modal.message}</p>
            {modal.type === 'success' ? (
              <Button onClick={redirectToLogin} className="w-full">
                Aller à la page de connexion
              </Button>
            ) : (
              <Button onClick={closeModal} className="w-full bg-red-500 hover:bg-red-600">
                Fermer
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
