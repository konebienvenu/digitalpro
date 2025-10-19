'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { Globe, Monitor, Zap, Wrench } from 'lucide-react';

export default function Realisations() {
  const projets = [
    {
      titre: 'Site e-commerce Alpha',
      description: 'Boutique en ligne complète avec gestion des produits et paiement sécurisé.',
      image: '/images/alpha.png',
      lien: 'https://www.alpha.com',
      icone: Globe,
    },
    {
      titre: 'Portfolio Beta',
      description: 'Site vitrine pour un photographe, affichage de galeries dynamiques.',
      image: '/images/beta.png',
      lien: 'https://www.beta.com',
      icone: Monitor,
    },
    {
      titre: 'Application Gamma',
      description: 'Application web interactive pour la gestion des tâches et projets.',
      image: '/images/gamma.png',
      lien: 'https://www.gamma.com',
      icone: Zap,
    },
    {
      titre: 'Site Corporate Delta',
      description: 'Site institutionnel pour une entreprise, design moderne et responsive.',
      image: '/images/delta.png',
      lien: 'https://www.delta.com',
      icone: Wrench,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-20 pb-16 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-bold mb-12 text-center" style={{ color: '#e8b900' }}>
            Nos Réalisations
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projets.map((projet, index) => {
              const Icon = projet.icone;
              return (
                <motion.a
                  key={index}
                  href={projet.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-4 bg-yellow-100 rounded-full">
                      <Icon size={36} color="#e8b900" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{projet.titre}</h2>
                    <p className="text-gray-700 mb-4">{projet.description}</p>
                    <button className="mt-auto px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors">
                      Voir le site
                    </button>
                  </div>
                  {projet.image && (
                    <img src={projet.image} alt={projet.titre} className="w-full h-48 object-cover" />
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
