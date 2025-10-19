'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#e8b900' }}>
            Conditions d’Utilisation
          </h1>

          <article className="bg-white p-8 rounded-xl shadow-lg text-gray-900 leading-relaxed">

            <p className="text-lg text-center mb-6">
              DigitalProLearning - Plateforme de création et maintenance de sites web
            </p>

            {/* Introduction */}
            <p className="mb-6">
              Bienvenue sur <span className="font-semibold" style={{ color: '#e8b900' }}>DigitalProLearning</span>, une plateforme créée en Côte d'Ivoire pour permettre à nos clients de commander, gérer et maintenir leurs sites internet. En utilisant notre service, vous acceptez ces conditions d’utilisation qui régissent votre accès et utilisation du site.
            </p>

            {/* 1. Inscription et Compte Utilisateur */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              1. Inscription et Compte Utilisateur
            </h2>
            <p className="mb-4">
              Pour accéder à certains services, vous devez créer un compte et fournir des informations exactes. Vous acceptez de maintenir la confidentialité de votre mot de passe et d’être responsable de toute activité sous votre compte.
            </p>
            <p className="mb-4">
              Lors de votre inscription, vous devez accepter nos conditions d’utilisation. En cas de non-respect, nous nous réservons le droit de suspendre ou supprimer votre compte.
            </p>

            {/* 2. Commandes et Services */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              2. Commandes et Services
            </h2>
            <p className="mb-4">
              DigitalProLearning permet de passer commande pour la création de sites internet personnalisés. Chaque commande est traitée avec soin, et nos équipes vous accompagnent tout au long du processus.
            </p>
            <p className="mb-4">
              Nous nous engageons à fournir un service de qualité, cependant, la livraison et les délais peuvent varier en fonction des spécificités du projet.
            </p>

            {/* 3. Paiement, Abonnement et Remboursement */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              3. Paiement, Abonnement et Remboursement
            </h2>
            <p className="mb-4">
              Le coût mensuel de maintenance et d’hébergement est de 15 000 francs CFA. Le paiement doit être effectué régulièrement selon les modalités convenues.
            </p>
            <p className="mb-4">
              En cas de non-paiement, nous nous réservons le droit de suspendre les services jusqu’à régularisation. La suspension ne libère pas l’utilisateur de ses obligations de paiement.
            </p>
            <p className="mb-4">
              Tout remboursement en cas de résiliation anticipée sera traité selon les modalités convenues avec notre support, et pourra être partiel selon la période déjà consommée.
            </p>

            {/* 4. Durée et Résiliation */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              4. Durée et Résiliation
            </h2>
            <p className="mb-4">
              La location de votre site web est prévue pour une durée indéterminée, tant que vous continuez à payer l’abonnement mensuel. Si vous décidez d’arrêter le paiement, le service pourra être suspendu, et l’accès au site sera interrompu après un préavis de 7 jours.
            </p>
            <p className="mb-4">
              Vous pouvez résilier votre abonnement à tout moment en contactant notre support. Après résiliation, le site restera la propriété de DigitalProLearning sauf accord spécifique écrit. Les contenus fournis par le client seront supprimés ou restitués selon la demande, et ne pourront être utilisés par DigitalProLearning à d’autres fins.
            </p>

            {/* 5. Propriété intellectuelle */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              5. Propriété intellectuelle
            </h2>
            <p className="mb-4">
              Tout le code, le design, la structure et les éléments créés par DigitalProLearning pour votre site restent la propriété exclusive de DigitalProLearning. Les clients disposent d’un droit d’utilisation limité au cadre de leur abonnement.
            </p>
            <p className="mb-4">
              Les images, logos, vidéos ou autres contenus fournis par le client restent la propriété exclusive du client. DigitalProLearning ne revendique aucun droit sur ces contenus.
            </p>

            {/* 6. Responsabilités */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              6. Responsabilités
            </h2>
            <p className="mb-4">
              DigitalProLearning ne pourra être tenu responsable des dommages directs ou indirects résultant de l’utilisation du service, ni des contenus fournis par les utilisateurs, dans la limite permise par la loi. La plateforme ne garantit pas l’absence d’erreurs ou de bugs.
            </p>

            {/* 7. Confidentialité et Protection des données */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              7. Confidentialité et Protection des données
            </h2>
            <p className="mb-4">
              Nous collectons certaines données personnelles pour fournir et améliorer nos services (nom, email, informations de paiement, contenus téléchargés). Ces données sont conservées de manière sécurisée et ne seront pas partagées avec des tiers sans votre consentement, sauf obligation légale.
            </p>
            <p className="mb-4">
              Vous pouvez demander l’accès, la rectification ou la suppression de vos données en contactant notre support. En utilisant nos services, vous acceptez cette collecte et utilisation conformément aux lois applicables en Côte d'Ivoire et à l’international.
            </p>

            {/* 8. Modification des Conditions */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              8. Modification des Conditions
            </h2>
            <p className="mb-4">
              DigitalProLearning peut modifier ces conditions à tout moment. Les utilisateurs seront informés des changements majeurs par email ou notification sur le site. La poursuite de l’utilisation du service après modification constitue une acceptation des nouvelles conditions.
            </p>

            {/* 9. Force majeure et Limitation */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              9. Force majeure et Limitation
            </h2>
            <p className="mb-4">
              DigitalProLearning ne pourra être tenu responsable en cas d’événements imprévus indépendants de sa volonté, comme des pannes, attaques informatiques, catastrophes naturelles, ou problèmes de connexion internet. La plateforme fera des efforts raisonnables pour rétablir le service dans les meilleurs délais.
            </p>

            {/* 10. Contact */}
            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              10. Contact
            </h2>
            <p>
              Pour toute question ou réclamation, contactez notre support à <a href="mailto:support@digitalprolearning.com" className="underline" style={{ color: '#e8b900' }}>support@digitalprolearning.com</a>.
            </p>

          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
