'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';

type ModalType = 'success' | 'error';

interface ModalState {
  show: boolean;
  type: ModalType;
  message: string;
}

const ModalIcon = ({ type }: { type: ModalType }) => {
  return type === 'error' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-red-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-yellow-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'error', message: '' });
  const [redirectUrl, setRedirectUrl] = useState('/order'); 
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const closeModal = () => {
    setModal({ ...modal, show: false });
    setProgress(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setModal({ show: true, type: 'error', message: 'Veuillez remplir tous les champs' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setModal({ show: true, type: 'error', message: data?.error || 'Échec de la connexion' });
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const url = new URLSearchParams(window.location.search).get('redirect') || '/order';
      setRedirectUrl(url);

      // Affiche le modal de succès
      setModal({ show: true, type: 'success', message: 'Connexion réussie !' });

    } catch (err: any) {
      setModal({ show: true, type: 'error', message: err.message || 'Erreur réseau ou serveur' });
    } finally {
      setIsLoading(false);
    }
  };

  // Barre de progression robuste
  useEffect(() => {
    let animationFrame: number;

    if (modal.show && modal.type === 'success') {
      setProgress(5); // commence à 5% pour que l'utilisateur voit le démarrage
      const totalTime = 6500; // durée totale 6,5 secondes
      const startTime = performance.now();

      const updateProgress = () => {
        const elapsed = performance.now() - startTime;
        let newProgress = 5 + (elapsed / totalTime) * 95;
        newProgress = Math.min(newProgress, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          router.push(redirectUrl); // redirection après la barre
        }
      };

      // délai minimal pour que le DOM affiche le modal avant de remplir
      const timeout = setTimeout(() => {
        animationFrame = requestAnimationFrame(updateProgress);
      }, 100);

      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [modal.show, modal.type, redirectUrl, router]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#e8b900]50 to-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Se connecter</h1>
            <p className="text-lg text-gray-600">Accédez à votre compte DigitalProLearning</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                  placeholder="Votre mot de passe"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="h-4 w-4 text-[#e8b900] focus:ring-[#e8b900] border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>

                <Link href="/forgot-password" className="text-[#e8b900] hover:text-[#d4b800]">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Vous n'avez pas encore de compte ?{' '}
                <Link href="/register" className="text-[#e8b900] hover:text-[#d4b800] font-medium">
                  S'inscrire gratuitement
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

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
              <ModalIcon type={modal.type} />
            </div>
            <p className="text-gray-700 whitespace-pre-line mb-4">{modal.message}</p>

            {modal.type === 'success' && (
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-yellow-500 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <Button onClick={closeModal} className="w-full">
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
