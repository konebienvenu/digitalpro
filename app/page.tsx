'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '../lib/middleware';
import { useAuth } from '../components/AuthProvider';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOrderSite = () => {
    if (isLoggedIn) {
      router.push('/order');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-white"></div>

      <Header />

      <section className="pt-24 md:pt-28 pb-12 relative overflow-hidden bg-white">
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>



       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
  <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
    <div className="mb-6">
      <div
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-xl rounded-full border border-[#e8b900]/30 mb-6"
        onClick={() => {
          const newCount = clickCount + 1;
          setClickCount(newCount);
          if (newCount === 7) {
            setShowAdminButton(true);
          }
        }}
      >
        <div className="w-2 h-2 bg-[#e8b900] rounded-full animate-pulse mr-2"></div>
        <span className="text-[#e8b900] font-bold text-sm">PREMIÈRE EN CÔTE D'IVOIRE</span>
      </div>

      {showAdminButton && (
        <Link href="/admin/register" className="animate-fadeIn">
          <button className="group relative overflow-hidden inline-block">
            {/* Glow léger et discret */}
            <div className="absolute inset-0 bg-red-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            {/* Bouton principal */}
            <div className="relative bg-red-600 text-white px-5 py-2 text-sm font-semibold rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 flex items-center gap-2">
              <i className="ri-admin-line text-sm"></i>
              ADMIN
            </div>
            {/* Halo subtil */}
            <div className="absolute -inset-0.5 rounded-full border-2 border-red-500 opacity-20 blur-md"></div>
          </button>


                </Link>
              )}
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-black mb-6 leading-tight tracking-tight">
              Nous créons votre 
              <span className="block text-black">site web professionnel</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-800 mb-6 max-w-4xl mx-auto leading-relaxed">
              La <span className="text-[#e8b900] font-bold">première plateforme</span> qui crée, héberge et maintient votre site web d'exception pour 
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] to-[#e8b900] block mt-2">15.000 FCFA/mois</span>
            </p>

            <div className="relative mb-8 flex justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-[#e8b900]/90 via-[#e8b900]/90 to-[#e8b900]/90 backdrop-blur-xl text-white px-6 py-4 rounded-3xl shadow-2xl border border-white/20">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                    <p className="text-lg md:text-xl font-black">OFFRE DE LANCEMENT EXCLUSIVE</p>
                    <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-base md:text-lg font-light">
                    Création • Design • Hébergement • Maintenance = Excellence absolue incluse
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={handleOrderSite}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse scale-110"></div>
                <div className="relative bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] text-white px-12 py-6 text-xl md:text-2xl font-black rounded-full shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-3 !rounded-button">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-full"></span>
                  <span className="relative flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                      <i className="ri-rocket-line text-lg"></i>
                    </div>
                    COMMANDER MON SITE
                    <i className="ri-arrow-right-line text-xl group-hover:translate-x-3 transition-transform duration-500"></i>
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 flex justify-center items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e8b900] rounded-full animate-pulse"></div>
                <span className="text-base font-medium">Livraison en 7 jours</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e8b900] rounded-full animate-pulse"></div>
                <span className="text-base font-medium">Garantie satisfaction</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e8b900] rounded-full animate-pulse"></div>
                <span className="text-base font-medium">Support 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 right-4 w-3 h-3 bg-[#e8b900] rounded-full animate-bounce delay-700 opacity-60"></div>
        <div className="absolute bottom-32 right-8 w-3 h-3 bg-[#e8b900] rounded-full animate-bounce delay-500 opacity-60"></div>
      </section>


      <section className="py-16 relative overflow-hidden bg-white">
  <div className="absolute inset-0 bg-white"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] mb-4">
        L'excellence à la ivoirienne
      </h2>
      <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
        La première plateforme qui révolutionne la création de sites web professionnels en Côte d'Ivoire
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
            <i className="ri-magic-line text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Création Premium</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Design ultra-moderne, contenu parfaitement optimisé, logo intégré avec finesse. Nous créons l'excellence de A à Z.
          </p>
        </div>
      </div>

      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
            <i className="ri-cloud-line text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Hébergement Premium</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Serveurs ultra-rapides, sécurité maximale, nom de domaine exclusif. Infrastructure professionnelle garantie.
          </p>
        </div>
      </div>

      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
            <i className="ri-tools-line text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Maintenance Experte</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Mises à jour automatiques, sauvegardes sécurisées, support technique d'exception. Performance garantie 24/7.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-12">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white backdrop-blur-xl rounded-3xl p-10 text-center border border-[#e8b900]/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/5 via-[#e8b900]/5 to-[#e8b900]/5 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] to-[#e8b900] mb-3">
              PACKAGE COMPLET PROFESSIONNEL
            </h3>
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] mb-3">
              15.000 FCFA
            </div>
            <p className="text-xl text-gray-800 mb-4">Par mois • Aucun frais caché • Annulation libre</p>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 backdrop-blur-sm p-3 rounded-2xl border border-[#e8b900]/30">
                <i className="ri-palette-line text-2xl text-[#e8b900] mb-2"></i>
                <p className="text-gray-900 font-bold text-sm">Création sur mesure premium</p>
              </div>
              <div className="bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 backdrop-blur-sm p-3 rounded-2xl border border-[#e8b900]/30">
                <i className="ri-shield-star-line text-2xl text-[#e8b900] mb-2"></i>
                <p className="text-gray-900 font-bold text-sm">Hébergement sécurisé</p>
              </div>
              <div className="bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 backdrop-blur-sm p-3 rounded-2xl border border-[#e8b900]/30">
                <i className="ri-tools-line text-2xl text-[#e8b900] mb-2"></i>
                <p className="text-gray-900 font-bold text-sm">Maintenance experte 24/7</p>
              </div>
              <div className="bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 backdrop-blur-sm p-3 rounded-2xl border border-[#e8b900]/30">
                <i className="ri-customer-service-line text-2xl text-[#e8b900] mb-2"></i>
                <p className="text-gray-900 font-bold text-sm">Support personnalisé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <section className="py-16 relative overflow-hidden bg-white">
  <div className="absolute inset-0 bg-white"></div>
  <div className="absolute inset-0">
    <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-[#e8b900]/10 to-[#e8b900]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900] mb-4">
        Solutions Professionnelles
      </h2>
      <p className="text-xl text-gray-700">Nous nous occupons de tout, vous brillez dans votre domaine</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Sites d'Entreprise */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
            <img 
              src="https://readdy.ai/api/search-image?query=icon%2C%203D%20modern%20business%20building%2C%20professional%20corporate%20office%2C%20clean%20lime%20green%20and%20white%20architecture%2C%20sophisticated%20design%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20lime%20green%20and%20white%20colors%2C%20minimalist%20professional%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20professional%20and%20modern%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20luxurious%20look%2C%20single%20object%20focus&width=100&height=100&seq=business-icon-lime&orientation=squarish"
              alt="Entreprises professionnelles" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'entreprise</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Créez une présence digitale professionnelle qui met en valeur vos produits et services, avec des sections visuelles élégantes et des présentations claires qui captivent vos clients dès le premier regard.
          </p>
        </div>
      </div>

      {/* Sites d'Église */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
            <img 
              src="https://readdy.ai/api/search-image?query=icon%2C%203D%20elegant%20church%20building%2C%20beautiful%20sacred%20architecture%2C%20spiritual%20lime%20green%20and%20white%20design%2C%20sophisticated%20religious%20structure%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20lime%20green%20and%20white%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20peaceful%20and%20inspiring%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20professional%20look%2C%20single%20object%20focus&width=100&height=100&seq=church-icon-lime&orientation=squarish"
              alt="Églises" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'église</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Connectez votre communauté avec un site web lumineux et accueillant, présentant vos événements, sermons et projets à travers des mises en page visuelles harmonieuses qui inspirent et créent du lien.
          </p>
        </div>
      </div>

      {/* Sites d'Organisation */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
            <img 
              src="https://readdy.ai/api/search-image?query=icon%2C%203D%20professional%20community%20organization%2C%20elegant%20people%20networking%2C%20lime%20green%20and%20white%20collaboration%2C%20professional%20teamwork%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20lime%20green%20and%20white%20colors%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20professional%20and%20inspiring%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=org-icon-lime&orientation=squarish"
              alt="Organisations" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'association ou ONG</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Développez une plateforme élégante pour votre association ou ONG, avec des sections visuelles qui présentent vos missions, projets et événements de manière claire et impactante pour vos visiteurs.
          </p>
        </div>
      </div>

      {/* Sites Restaurant */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e8b900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 12h16M4 16h16M4 20h16" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites de restaurant</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Mettez en valeur votre carte et votre ambiance avec un site vitrine riche en visuels, où chaque plat et chaque espace de votre restaurant est présenté de manière attractive et gourmande.
          </p>
        </div>
      </div>

      {/* Sites Hôtel */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e8b900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8l9-4 9 4v8M4 13h16" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'hôtel</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Offrez à vos clients une expérience visuelle dès la réservation, avec des galeries de chambres, des espaces communs élégants et un design qui reflète le confort et le luxe de votre hôtel.
          </p>
        </div>
      </div>

      {/* Sites Immobilier */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#e8b900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v11a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V10z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'agence immobilière</h3>
          <p className="text-base text-gray-700 text-center leading-relaxed">
            Valorisez vos biens immobiliers avec un site vitrine clair et visuel, présentant chaque propriété avec des images, des détails et des plans pour séduire vos futurs acheteurs ou locataires.
          </p>
        </div>
      </div>
{/* Sites d'École / Établissement */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
    <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#e8b900" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.52L12 14z" />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites d'école</h3>
    <p className="text-base text-gray-700 text-center leading-relaxed">
      Offrez à votre établissement scolaire une présence en ligne claire et professionnelle, mettant en avant vos programmes, vos équipes et vos événements. Grâce à une interface soignée et intuitive, vos visiteurs découvrent facilement votre école et vos services, renforçant la confiance et l’attractivité de votre institution.
    </p>
  </div>
</div>

{/* Sites de Santé / Clinique */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
    <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#e8b900" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
        <circle cx="12" cy="12" r="9" stroke="#e8b900" strokeWidth={2} />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Sites de clinique</h3>
    <p className="text-base text-gray-700 text-center leading-relaxed">
      Présentez votre clinique ou centre médical avec élégance et professionnalisme. Une interface claire met en valeur vos spécialités, vos équipes et vos services, facilitant la prise de contact et renforçant la crédibilité de votre établissement. Attirez vos patients grâce à un site organisé, lisible et visuellement engageant.
    </p>
  </div>
</div>

{/* Autres Sites */}
<div className="group relative">
  <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="relative bg-white backdrop-blur-xl p-8 rounded-3xl border border-[#e8b900]/50 hover:border-[#e8b900]/50 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-3 shadow-xl">
    <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900]/20 to-[#e8b900]/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-[#e8b900]/30 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#e8b900" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-[#e8b900] mb-3 text-center">Autres sites</h3>
    <p className="text-base text-gray-700 text-center leading-relaxed">
      Pour tous les autres types de sites professionnels, créez une présence en ligne qui attire et retient l’attention de vos visiteurs. Mettez en valeur vos produits, services ou projets avec un design soigné et moderne, offrant une navigation fluide et une expérience utilisateur agréable, tout en reflétant l’identité et les valeurs de votre activité.
    </p>
  </div>
</div>

    </div>
  </div>
</section>




      <section className="py-10 relative overflow-hidden mb-6">
  <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900] via-[#e8b900] to-[#e8b900]"></div>
  <div className="absolute inset-0 bg-gradient-to-br from-[#e8b900]/20 via-transparent to-[#e8b900]/20"></div>
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
  </div>

  <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-snug">
      Rejoignez l'excellence digitale !
    </h2>
    <p className="text-base md:text-lg text-white/90 mb-6 leading-normal">
      Soyez parmi les pionniers de l'excellence web en Côte d'Ivoire
    </p>

    <button 
      onClick={handleOrderSite}
      className="group relative overflow-hidden mb-4"
    >
      <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 animate-pulse scale-110"></div>
      <div className="relative bg-white/90 backdrop-blur-md text-[#e8b900] px-10 py-4 text-lg font-bold rounded-full shadow-xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 border-4 border-white/40">
        <span className="absolute inset-0 bg-gradient-to-r from-[#e8b900]/50 to-[#e8b900]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-full"></span>
        <span className="relative flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-r from-[#e8b900] to-[#d1a800] rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
            <i className="ri-rocket-line text-sm text-white"></i>
          </div>
          JE VEUX MON SITE WEB
          <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform duration-500"></i>
        </span>
      </div>
    </button>

    <p className="text-sm md:text-base text-white/70 mb-4">
      L'excellence n'attend pas. Votre présence digitale commence maintenant.
    </p>

    <div className="mt-6 text-center">
      <p className="text-sm md:text-base font-semibold text-black bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl inline-block shadow-md">
        Révolutionnez votre <span className="text-lg text-[#e8b900] font-bold">présence digitale</span> avec la première plateforme ivoirienne d'exception
      </p>
    </div>
  </div>
</section>


      {showAuthModal && (
       <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn">
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
    <div className="relative bg-white backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full shadow-2xl transform animate-scaleIn border border-[#e8b900]/50">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-[#e8b900] to-[#e8b900] rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl">
          <i className="ri-rocket-line text-white text-3xl"></i>
        </div>
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e8b900] to-[#e8b900] mb-4">
          Accès Professionnel
        </h3>
        <p className="text-base text-gray-700 mb-8 leading-relaxed">
          Pour commander votre site web professionnel, accédez à votre espace en quelques secondes.
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/register" className="w-full">
            <button className="w-full bg-gradient-to-r from-[#e8b900] to-[#e8b900] text-white px-6 py-4 rounded-full font-bold hover:from-[#e8b900] hover:to-[#e8b900] transition-all duration-300 transform hover:scale-105 shadow-xl !rounded-button">
              Créer mon compte
            </button>
          </Link>
          <Link href="/login" className="w-full">
            <button className="w-full border-2 border-[#e8b900] text-[#e8b900] px-6 py-4 rounded-full font-bold hover:bg-[#e8b900] hover:text-white transition-all duration-300 transform hover:scale-105 !rounded-button backdrop-blur-sm">
              Se connecter
            </button>
          </Link>
        </div>
        <button 
          onClick={() => setShowAuthModal(false)}
          className="mt-6 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</div>

      )}
      
    </div>
  );
}