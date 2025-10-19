'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Shield,
  Database,
  Wrench,
  Zap,
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Création & Location de Sites Web',
      description:
        'Nous concevons et mettons à votre disposition un site internet moderne et adapté à vos besoins. Vous n’avez pas besoin d’un gros budget de départ : vous louez votre site à seulement 15 000 francs CFA par mois et nous nous occupons du reste.',
      icon: <Code className="w-12 h-12 text-[#e8b900]" />,
    },
    {
      title: 'Maintenance & Assistance Continue',
      description:
        'Votre site est toujours à jour et fonctionnel grâce à notre équipe. Pour seulement 15 000 francs CFA par mois, nous intervenons rapidement en cas de problème et assurons une assistance personnalisée.',
      icon: <Wrench className="w-12 h-12 text-[#e8b900]" />,
    },
    {
      title: 'Référencement & Visibilité',
      description:
        'Nous optimisons votre site pour améliorer sa visibilité dans les moteurs de recherche (SEO). Grâce à ces optimisations, vous augmentez vos chances d’apparaître parmi les premiers résultats et d’attirer plus de clients. Ce service est inclus dans l’abonnement de 15 000 francs CFA par mois.',
      icon: <Globe className="w-12 h-12 text-[#e8b900]" />,
    },
    {
      title: 'Sécurité & Sauvegarde',
      description:
        'Nous mettons en place des mesures de sécurité avancées pour protéger votre site. Sauvegardes régulières, surveillance continue et mises à jour incluses dans votre abonnement de 15 000 francs CFA par mois.',
      icon: <Shield className="w-12 h-12 text-[#e8b900]" />,
    },
    {
      title: 'Gestion Simplifiée de Contenus',
      description:
        'Vous ne touchez à rien : nous ajoutons, modifions ou optimisons vos textes, images et produits pour vous, sans aucune connaissance technique nécessaire. Ce service fait partie de votre abonnement de 15 000 francs CFA par mois.',
      icon: <Database className="w-12 h-12 text-[#e8b900]" />,
    },
    {
      title: 'Performance & Rapidité',
      description:
        'Nous optimisons la vitesse et la fluidité de votre site pour offrir une meilleure expérience à vos visiteurs. Inclus dans votre abonnement de 15 000 francs CFA par mois.',
      icon: <Zap className="w-12 h-12 text-[#e8b900]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Section Introduction */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#fff8e1] to-white">

  <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">

          <h1
            className="text-4xl font-bold mb-6"
            style={{ color: '#e8b900' }}
          >
            Nos Services
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Chez{' '}
            <span
              className="font-semibold"
              style={{ color: '#e8b900' }}
            >
              DigitalProLearning
            </span>
            , nous rendons la création et la gestion de site web accessible à
            tous grâce à notre formule de{' '}
            <span className="font-semibold">
              location de site internet à 15 000 francs CFA par mois
            </span>
            . Vous bénéficiez d’un site professionnel, toujours à jour, sans
            vous soucier des aspects techniques ou de maintenance. Nous nous
            occupons de tout pour que vous puissiez vous concentrer sur votre
            activité.
          </p>
        </div>
      </section>

      {/* Section Services */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-8 rounded-2xl shadow-lg transition duration-300"
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h2
                  className="text-2xl font-semibold mb-4 text-center"
                  style={{ color: '#e8b900' }}
                >
                  {service.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="pb-20 bg-gradient-to-tr from-white to-[#fff8e1]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: '#e8b900' }}
          >
            Pourquoi choisir DigitalProLearning ?
          </h2>
          <ul className="text-gray-700 leading-relaxed space-y-4 text-lg">
            <li>
              ✔️ Pas de gros investissement initial, payez uniquement{' '}
              <span className="font-semibold">15 000 francs CFA par mois</span>.
            </li>
            <li>
              ✔️ Une équipe disponible pour vous accompagner et répondre à vos
              besoins.
            </li>
            <li>
              ✔️ Un site toujours sécurisé, rapide et performant grâce à notre
              suivi inclus.
            </li>
            <li>
              ✔️ Un gain de temps pour vous concentrer sur ce qui compte : votre
              activité.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: '#e8b900' }}
        >
          Lancez votre site dès aujourd’hui !
        </h2>
        <p className="text-gray-700 mb-8">
          Passez votre commande maintenant et bénéficiez d’un site clé en main à
          seulement{' '}
          <span className="font-semibold">15 000 francs CFA par mois</span>,
          prêt à booster votre activité en ligne.
        </p>
        <a
          href="/order"
          className="bg-[#e8b900] text-white px-8 py-4 rounded-2xl shadow-lg font-semibold hover:opacity-90 transition"
        >
          Passez votre commande
        </a>
      </section>

      <Footer />
    </div>
  );
}
