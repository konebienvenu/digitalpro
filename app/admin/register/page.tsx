'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
    acceptTerms: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.firstName.trim()) newErrors.push('Le prénom est requis');
    if (!formData.lastName.trim()) newErrors.push('Le nom est requis');
    if (!formData.email.trim()) newErrors.push('L\'email est requis');
    if (!formData.password) newErrors.push('Le mot de passe est requis');
    if (formData.password.length < 8) newErrors.push('Le mot de passe doit contenir au moins 8 caractères');
    if (formData.password !== formData.confirmPassword) newErrors.push('Les mots de passe ne correspondent pas');
    if (!formData.adminCode) newErrors.push('Le code administrateur est requis');
    if (formData.adminCode !== 'ADMIN2024') newErrors.push('Code administrateur incorrect');
    if (!formData.acceptTerms) newErrors.push('Vous devez accepter les conditions d\'utilisation');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Header />

        <section className="pt-20 pb-16 min-h-screen flex items-center relative z-10">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-red-200/50 relative overflow-hidden">
              <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-10"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/30">
                <i className="ri-admin-line text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
                Compte administrateur créé !
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Votre compte administrateur a été créé avec succès. Vous pouvez maintenant vous connecter.
              </p>
              <Link href="/admin/login">
                <Button size="lg" className="w-full mb-6 !rounded-button shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
                  <i className="ri-login-circle-line mr-2"></i>
                  Se connecter en tant qu'admin
                </Button>
              </Link>
              <Link href="/" className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-300">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-64 h-64 bg-red-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-60 right-10 w-48 h-48 bg-red-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Header />

      <section className="pt-20 pb-16 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/30">
              <i className="ri-admin-line text-white text-3xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Administration
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
              Créer un compte administrateur pour gérer la plateforme
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-10 md:p-12 rounded-3xl shadow-2xl border border-red-200/50 relative overflow-hidden">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-xl"></div>

            {errors.length > 0 && (
              <div className="mb-8 p-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <i className="ri-error-warning-line text-white text-sm"></i>
                  </div>
                  <h3 className="font-semibold text-red-800">Erreurs de validation</h3>
                </div>
                <ul className="text-red-600 text-sm space-y-2 ml-11">
                  {errors.map((error, index) => (
                    <li key={index} className="flex items-center">
                      <i className="ri-arrow-right-s-line mr-1"></i>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form id="admin-register-form" onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="firstName" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-red-500/30">
                      <i className="ri-user-line text-white text-sm"></i>
                    </div>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                    placeholder="Votre prénom"
                  />
                </div>

                <div className="group">
                  <label htmlFor="lastName" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-orange-500/30">
                      <i className="ri-user-line text-white text-sm"></i>
                    </div>
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-red-500/30">
                    <i className="ri-mail-line text-white text-sm"></i>
                  </div>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                  placeholder="admin@digitalprolearning.com"
                />
              </div>

              <div className="group">
                <label htmlFor="adminCode" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-red-500/30">
                    <i className="ri-key-line text-white text-sm"></i>
                  </div>
                  Code administrateur *
                </label>
                <input
                  type="password"
                  id="adminCode"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                  placeholder="Code secret administrateur"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Code requis pour créer un compte administrateur
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-red-500/30">
                      <i className="ri-lock-line text-white text-sm"></i>
                    </div>
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                    placeholder="Minimum 8 caractères"
                  />
                </div>

                <div className="group">
                  <label htmlFor="confirmPassword" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-orange-500/30">
                      <i className="ri-lock-2-line text-white text-sm"></i>
                    </div>
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-red-300 shadow-lg shadow-red-500/5"
                    placeholder="Répétez votre mot de passe"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-red-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-lg shadow-red-500/5">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="opacity-0 absolute h-6 w-6"
                  />
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      formData.acceptTerms
                        ? 'bg-gradient-to-br from-red-500 to-orange-600 border-red-500 shadow-lg shadow-red-500/30'
                        : 'border-red-300 bg-white hover:border-red-400'
                    }`}
                  >
                    {formData.acceptTerms && <i className="ri-check-line text-white text-sm"></i>}
                  </div>
                </div>
                <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  J'accepte les conditions d'utilisation administrateur et je m'engage à respecter la confidentialité des données
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full !rounded-button shadow-2xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-3"></i>
                    Création du compte admin...
                  </>
                ) : (
                  <>
                    <i className="ri-admin-line mr-3"></i>
                    Créer le compte administrateur
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center relative z-10">
              <p className="text-gray-600">
                Vous avez déjà un compte admin ?{' '}
                <Link href="/admin/login" className="text-red-600 hover:text-red-700 font-semibold underline transition-colors duration-300">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}