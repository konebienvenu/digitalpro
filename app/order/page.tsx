'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import { useState } from 'react';

export default function Order() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    whatsapp: '',
    siteType: '',
    objectives: '',
    logo: null as File | null,
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      logo: file
    }));
  };

  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="pt-20 pb-16 bg-gradient-to-br from-[#fff9db] to-white min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-20 h-20 bg-[#e8b90033] rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-[#e8b900] text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande envoyée avec succès !</h2>
              <p className="text-lg text-gray-600 mb-6">
                Merci {formData.contactName} ! Votre demande pour <strong>{formData.organizationName}</strong> a été reçue.
              </p>
              <div className="bg-[#fff9db] p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Prochaines étapes :</h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="ri-time-line text-[#e8b900] mt-1 mr-2"></i>
                    Notre équipe vous contactera dans les 24h
                  </li>
                  <li className="flex items-start">
                    <i className="ri-discuss-line text-[#e8b900] mt-1 mr-2"></i>
                    Nous discuterons de vos besoins en détail
                  </li>
                  <li className="flex items-start">
                    <i className="ri-palette-line text-[#e8b900] mt-1 mr-2"></i>
                    Création et livraison sous 48-72h
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/'}>
                  Retour à l'accueil
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                  Nous contacter
                </Button>
              </div>
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
      
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fff9db] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commander votre site web
            </h1>
            <p className="text-lg text-gray-600">
              Remplissez ce formulaire pour recevoir votre devis personnalisé
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-[#e8b900] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-[#e8b900]' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              Étape {step} sur 3
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form id="order-form" onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations générales</h2>
                  
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'organisation *
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                      placeholder="Nom de votre entreprise, église ou organisation"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du contact *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleNextStep}>
                      Continuer
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Project Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails du projet</h2>
                  
                  <div>
                    <label htmlFor="siteType" className="block text-sm font-medium text-gray-700 mb-2">
                      Type de site web *
                    </label>
                    <select
                      id="siteType"
                      name="siteType"
                      value={formData.siteType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                    >
                      <option value="">Sélectionnez le type de site</option>
                      <option value="vitrine">Site vitrine (présentation)</option>
                      <option value="ecommerce">Site e-commerce</option>
                      <option value="blog">Blog / Site d'actualités</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="evenementiel">Site événementiel</option>
                      <option value="institutionnel">Site institutionnel</option>
                      <option value="autre">Autre (précisez ci-dessous)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-2">
                      Objectifs du site web *
                    </label>
                    <textarea
                      id="objectives"
                      name="objectives"
                      value={formData.objectives}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent resize-none"
                      placeholder="Décrivez vos objectifs : attirer des clients, présenter vos services, vendre en ligne, informer votre communauté..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.objectives.length}/500 caractères
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                      Logo de l'organisation
                    </label>
                    <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label htmlFor="logo" className="cursor-pointer text-[#e8b900] font-semibold">
                        {formData.logo ? formData.logo.name : "Cliquez pour télécharger un fichier"}
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <i className="ri-arrow-left-line mr-2"></i>
                      Précédent
                    </Button>
                    <Button onClick={handleNextStep}>
                      Continuer
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Additional Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations complémentaires</h2>
                  
                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                      Autres informations (facultatif)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={6}
                      maxLength={1000}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent resize-none"
                      placeholder="Vous pouvez préciser ici des détails supplémentaires, contraintes, inspirations, etc."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.additionalInfo.length}/1000 caractères
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <i className="ri-arrow-left-line mr-2"></i>
                      Précédent
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Envoi...
                        </>
                      ) : (
                        <>
                          Envoyer la commande
                          <i className="ri-send-plane-line ml-2"></i>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
