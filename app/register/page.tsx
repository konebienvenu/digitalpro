'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

type ModalType = 'success' | 'error';

interface ModalState {
  show: boolean;
  type: ModalType;
  message: string;
}

// Composant pour l'icône du modal
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

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationType: '',
    otherOrganizationType: '',
    acceptTerms: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'error', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.firstName.trim()) newErrors.push('Le prénom est requis');
    if (!formData.lastName.trim()) newErrors.push('Le nom est requis');
    if (!formData.email.trim()) newErrors.push('L\'email est requis');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.push("L'email n'est pas valide");

    if (formData.password.length < 8) {
      newErrors.push('Le mot de passe doit contenir au moins 8 caractères');
    } else {
      if (!/[A-Z]/.test(formData.password)) newErrors.push('Le mot de passe doit contenir au moins une lettre majuscule');
      if (!/[0-9]/.test(formData.password)) newErrors.push('Le mot de passe doit contenir au moins un chiffre');
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) newErrors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }

    if (formData.password !== formData.confirmPassword) newErrors.push('Les mots de passe ne correspondent pas');

    if (!formData.organizationType) newErrors.push('Le type d\'organisation est requis');
    else if (formData.organizationType === 'autre' && !formData.otherOrganizationType.trim()) newErrors.push('Veuillez renseigner le type d\'organisation "Autre"');

    if (!formData.acceptTerms) newErrors.push('Vous devez accepter les conditions d\'utilisation');

    if (newErrors.length > 0) {
      setModal({ show: true, type: 'error', message: newErrors.join('\n') });
      return false;
    }

    return true;
  };

  const closeModal = () => setModal({ ...modal, show: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          organizationType: formData.organizationType === 'autre' ? formData.otherOrganizationType : formData.organizationType,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setModal({ show: true, type: 'error', message: data?.message || 'Erreur lors de l’inscription' });
        setIsLoading(false);
        return;
      }

      setModal({ show: true, type: 'success', message: 'Inscription réussie !' });
      setIsSubmitted(true);
    } catch (error: any) {
      setModal({ show: true, type: 'error', message: error.message || 'Erreur réseau ou serveur' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="pt-32 pb-16 bg-gradient-to-br from-[#f7f2d6] to-white min-h-screen flex items-center">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-[#f7f2d6] rounded-full flex items-center justify-center mx-auto mb-4">
                <ModalIcon type="success" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inscription réussie !</h2>
              <p className="text-gray-700 mb-6">
                Un email de vérification a été envoyé à <strong>{formData.email}</strong>.<br />
                Veuillez vérifier votre boîte de réception pour activer votre compte.
              </p>
              <a
                href="https://mail.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e8b900] hover:text-[#c1a600] font-semibold"
              >
                Accéder à ma boîte mail
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#f7f2d6] to-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Créer un compte</h1>
            <p className="text-lg text-gray-600">Rejoignez DigitalProLearning et créez votre site web professionnel</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form id="register-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">Type d'organisation *</label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                >
                  <option value="">Sélectionnez votre type d'organisation</option>
                  <option value="entreprise">Entreprise</option>
                  <option value="eglise">Église</option>
                  <option value="association">Association ou ONG</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="hotel">Hôtel</option>
                  <option value="immobilier">Agence immobilière</option>
                  <option value="ecole">École</option>
                  <option value="santé">Secteur santé</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {formData.organizationType === 'autre' && (
                <div>
                  <label htmlFor="otherOrganizationType" className="block text-sm font-medium text-gray-700 mb-2">
                    Précisez votre type d'organisation *
                  </label>
                  <input
                    type="text"
                    id="otherOrganizationType"
                    name="otherOrganizationType"
                    value={formData.otherOrganizationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                    placeholder="Entrez le type d'organisation"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                  placeholder="Minimum 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                  placeholder="Répétez votre mot de passe"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#e8b900] focus:ring-[#e8b900] border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-[#e8b900] hover:text-[#c1a600]">conditions d'utilisation</Link>{' '}
                  et la{' '}
                  <Link href="/privacy" className="text-[#e8b900] hover:text-[#c1a600]">politique de confidentialité</Link>
                </label>
              </div>

              <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Création du compte...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{' '}
                <Link href="/login" className="text-[#e8b900] hover:text-[#c1a600] font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
              <ModalIcon type={modal.type} />
            </div>
            <p className="text-gray-700 whitespace-pre-line mb-6">{modal.message}</p>
            <Button onClick={closeModal} className="w-full">
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
