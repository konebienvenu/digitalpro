'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'already' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Lien de vérification invalide.');
      return;
    }

    async function verifyEmail() {
      try {
        const res = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage('Votre adresse email est bien vérifiée ! Vous pouvez maintenant vous connecter.');
        } else if (res.status === 409) {
          setStatus('already');
          setMessage("Vous avez déjà vérifié votre adresse email. Pas besoin de cliquer plusieurs fois, c'est déjà fait !");
        } else {
          setStatus('error');
          setMessage(data.message || 'Erreur lors de la vérification.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erreur réseau, veuillez réessayer plus tard.');
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8b900]50 px-4">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
        {status === 'loading' && <p className="text-lg text-gray-700">Vérification en cours...</p>}

        {(status === 'success' || status === 'already') && (
          <>
            <div className="mb-4 w-16 h-16 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-16 h-16 text-[#e8b900]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              {status === 'success' ? 'Email vérifié !' : 'Déjà vérifié'}
            </h1>
            <p className="mb-6 text-gray-700">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-[#e8b900] text-white px-6 py-3 rounded-lg hover:bg-[#d1a800] transition"
            >
              Se connecter
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-4 text-red-600 text-4xl">❌</div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">Erreur</h1>
            <p className="mb-6 text-gray-700">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Retour à l'accueil
            </button>
          </>
        )}
      </div>
    </div>
  );
}
