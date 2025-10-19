'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (formData.email === 'admin@digitalprolearning.com' && formData.password === 'admin123') {
        setIsSubmitted(true);
      } else {
        setError('Email ou mot de passe administrateur incorrect');
      }
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
        <Header />
        
        <section className="pt-20 pb-16 min-h-screen flex items-center">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-red-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="ri-admin-line text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Connexion admin réussie !</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bienvenue dans l'espace administrateur. Accédez au tableau de bord.
              </p>
              <Link href="/admin/dashboard">
                <Button size="lg" className="w-full mb-4 !rounded-button shadow-lg bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
                  <i className="ri-dashboard-line mr-2"></i>
                  Tableau de bord
                </Button>
              </Link>
              <Link href="/" className="text-red-600 hover:text-red-700 font-medium transition-colors">
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
      <Header />
      
      <section className="pt-20 pb-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl shadow-lg mb-6">
              <i className="ri-admin-line text-white text-2xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Administration
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connectez-vous à l'espace administrateur
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-red-200/50">
            {error && (
              <div className="mb-8 p-6 bg-red-50/80 border border-red-200 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <i className="ri-error-warning-line text-red-500 text-xl mr-3"></i>
                  <h3 className="font-semibold text-red-700">Erreur</h3>
                </div>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-8 p-6 bg-blue-50/80 border border-blue-200 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center mb-3">
                <i className="ri-information-line text-blue-500 text-xl mr-3"></i>
                <h3 className="font-semibold text-blue-700">Compte administrateur de test</h3>
              </div>
              <p className="text-blue-600 text-sm leading-relaxed">
                <strong>Email:</strong> admin@digitalprolearning.com<br/>
                <strong>Mot de passe:</strong> admin123
              </p>
            </div>
            
            <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700">
                  <i className="ri-mail-line mr-2 text-red-500"></i>
                  Email administrateur *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-white/50 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-300/50 focus:border-red-400 transition-all duration-300 placeholder-gray-400"
                  placeholder="admin@digitalprolearning.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700">
                  <i className="ri-lock-password-line mr-2 text-red-500"></i>
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-white/50 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-300/50 focus:border-red-400 transition-all duration-300 placeholder-gray-400"
                  placeholder="Mot de passe administrateur"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="opacity-0 absolute h-5 w-5"
                    />
                    <div className={`h-5 w-5 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      formData.rememberMe 
                        ? 'bg-red-500 border-red-500' 
                        : 'border-red-300 hover:border-red-400'
                    }`}>
                      {formData.rememberMe && (
                        <i className="ri-check-line text-white text-sm"></i>
                      )}
                    </div>
                  </div>
                  <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                disabled={isLoading}
                className="w-full !rounded-button shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Connexion...
                  </>
                ) : (
                  <>
                    <i className="ri-login-circle-line mr-2"></i>
                    Se connecter
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent to-red-300 flex-1"></div>
                <span className="text-gray-500 text-sm">ou</span>
                <div className="h-px bg-gradient-to-l from-transparent to-red-300 flex-1"></div>
              </div>
              <p className="text-gray-600 text-lg">
                Pas encore de compte admin ?{' '}
                <Link href="/admin/register" className="text-red-600 hover:text-red-700 font-semibold underline decoration-red-300 hover:decoration-red-500 transition-colors">
                  Créer un compte
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