'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { Globe, Monitor, Zap, Wrench, ShoppingCart, Smartphone, Code, BarChart2, Users, Cpu, Server, MessageCircle, BookOpen, Camera, Video } from 'lucide-react';

export default function Realisations() {
  const projets = [
    { titre: 'Site e-commerce Alpha', description: 'Boutique en ligne complète avec gestion des produits et paiement sécurisé.', lien: 'https://www.alpha.com', icone: ShoppingCart },
    { titre: 'Portfolio Beta', description: 'Site vitrine pour un photographe, affichage de galeries dynamiques.', lien: 'https://www.beta.com', icone: Camera },
    { titre: 'Application Gamma', description: 'Application web interactive pour la gestion des tâches et projets.', lien: 'https://www.gamma.com', icone: Zap },
    { titre: 'Site Corporate Delta', description: 'Site institutionnel pour une entreprise, design moderne et responsive.', lien: 'https://www.delta.com', icone: Globe },
    { titre: 'Blog Epsilon', description: 'Blog professionnel avec articles et système de commentaires.', lien: 'https://www.epsilon.com', icone: BookOpen },
    { titre: 'Dashboard Zeta', description: 'Tableau de bord interactif pour l’analyse des données en temps réel.', lien: 'https://www.zeta.com', icone: BarChart2 },
    { titre: 'Application Mobile Eta', description: 'Application mobile multiplateforme pour la gestion quotidienne.', lien: 'https://www.eta.com', icone: Smartphone },
    { titre: 'Forum Theta', description: 'Plateforme de discussion avec catégories et messagerie privée.', lien: 'https://www.theta.com', icone: MessageCircle },
    { titre: 'Portfolio Iota', description: 'Portfolio en ligne pour un designer UX/UI, responsive et moderne.', lien: 'https://www.iota.com', icone: Monitor },
    { titre: 'Service Cloud Kappa', description: 'Solution cloud pour stockage et gestion sécurisée des données.', lien: 'https://www.kappa.com', icone: Server },
    { titre: 'Application IA Lambda', description: 'Application utilisant l’intelligence artificielle pour l’analyse.', lien: 'https://www.lambda.com', icone: Cpu },
    { titre: 'Site Vidéo Mu', description: 'Plateforme de partage et streaming vidéo haute qualité.', lien: 'https://www.mu.com', icone: Video },
    { titre: 'Marketplace Nu', description: 'Place de marché en ligne pour différents vendeurs et produits.', lien: 'https://www.nu.com', icone: ShoppingCart },
    { titre: 'Site Communauté Xi', description: 'Site pour fédérer une communauté avec profils et interactions.', lien: 'https://www.xi.com', icone: Users },
    { titre: 'Outil Dev Omicron', description: 'Outil en ligne pour développeurs avec fonctionnalités collaboratives.', lien: 'https://www.omicron.com', icone: Code },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-[#fff8e1] to-white">


        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#e8b900' }}>
            Nos Réalisations
          </h1>

          {/* Description de la section */}
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Découvrez notre sélection de projets récents : sites web, applications et outils en ligne conçus pour répondre aux besoins spécifiques de nos clients. Chaque réalisation reflète notre expertise en design, développement et expérience utilisateur.
          </p>

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
