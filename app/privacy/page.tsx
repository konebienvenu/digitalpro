'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#e8b900' }}>
            Politique de confidentialité
          </h1>

          <article className="bg-white p-8 rounded-xl shadow-lg text-gray-900 leading-relaxed">

            <p className="mb-6">
              Chez <span className="font-semibold" style={{ color: '#e8b900' }}>DigitalProLearning</span>, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos informations lorsque vous utilisez notre plateforme.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              1. Données collectées
            </h2>
            <p className="mb-4">
              Lors de votre inscription, de la passation de commande ou de l’utilisation de nos services, nous pouvons collecter les informations suivantes :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Informations d’identification : nom, prénom, adresse email, numéro de téléphone.</li>
              <li>Données de connexion : adresse IP, type de navigateur, durée de connexion.</li>
              <li>Informations liées aux commandes : détails des services commandés, mode de paiement, facturation.</li>
              <li>Préférences utilisateur et consentements.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              2. Base légale du traitement
            </h2>
            <p className="mb-4">
              Nous collectons et traitons vos données personnelles sur la base de votre consentement, pour l’exécution de nos services (contrat), ainsi que pour respecter nos obligations légales et réglementaires.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              3. Finalités du traitement
            </h2>
            <p className="mb-4">
              Vos données sont utilisées exclusivement dans les buts suivants :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Création, gestion et sécurisation de votre compte utilisateur.</li>
              <li>Traitement et suivi de vos commandes et abonnements.</li>
              <li>Communication concernant votre compte, vos commandes et notre service.</li>
              <li>Amélioration continue de notre plateforme et personnalisation de l’expérience utilisateur.</li>
              <li>Respect des obligations légales et fiscales en Côte d’Ivoire.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              4. Partage des données
            </h2>
            <p className="mb-4">
              Nous ne vendons ni ne louons vos données à des tiers. Nous pouvons partager vos informations uniquement avec des prestataires de services nécessaires au fonctionnement de notre plateforme, tels que :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Services d’hébergement et de maintenance.</li>
              <li>Prestataires de paiement sécurisés.</li>
              <li>Partenaires techniques pour l’envoi d’emails transactionnels.</li>
            </ul>
            <p>
              Ces prestataires sont contractuellement tenus de protéger vos données et de les utiliser uniquement pour les finalités définies.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              5. Durée de conservation
            </h2>
            <p className="mb-4">
              Vos données sont conservées pendant la durée nécessaire à la fourniture de nos services et à la gestion de votre compte, ainsi que pour respecter les obligations légales, fiscales et comptables en Côte d'Ivoire. Par exemple :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Données d’inscription et de connexion : pendant la durée de votre compte actif.</li>
              <li>Données liées aux commandes : 10 ans conformément aux obligations comptables.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              6. Sécurité des données
            </h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. Cela inclut :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cryptage des données sensibles.</li>
              <li>Contrôles d’accès restreints aux données.</li>
              <li>Surveillance régulière des systèmes.</li>
              <li>Sensibilisation de notre équipe et audits réguliers.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              7. Vos droits
            </h2>
            <p className="mb-4">
              Conformément à la réglementation applicable, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Droit d’accès : vous pouvez demander quelles données nous détenons à votre sujet.</li>
              <li>Droit de rectification : vous pouvez corriger des informations inexactes ou incomplètes.</li>
              <li>Droit à l’effacement : sous réserve des obligations légales, vous pouvez demander la suppression de vos données.</li>
              <li>Droit d’opposition et limitation du traitement.</li>
              <li>Droit à la portabilité des données.</li>
            </ul>
            <p>
              Pour exercer vos droits, veuillez nous contacter à l’adresse email dédiée mentionnée ci-dessous.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              8. Cookies et technologies similaires
            </h2>
            <p className="mb-4">
              Notre plateforme utilise un cookie unique “Se souvenir de moi” pour maintenir votre connexion active et sécurisée. Aucun autre cookie n’est utilisé pour le moment.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              9. Transfert international de données
            </h2>
            <p className="mb-4">
              Étant donné que notre plateforme est accessible depuis plusieurs pays, vos données peuvent être transférées et stockées hors de Côte d'Ivoire. Nous veillons à ce que ces transferts respectent les règles de confidentialité et bénéficient d’un niveau de protection adéquat.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              10. Mise à jour de la politique
            </h2>
            <p>
              Cette politique de confidentialité peut être mise à jour périodiquement. Nous vous invitons à la consulter régulièrement pour prendre connaissance des éventuelles modifications.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8" style={{ color: '#e8b900' }}>
              11. Contact
            </h2>
            <p className="mb-4">
              Pour toute question relative à vos données personnelles ou à l’exercice de vos droits, vous pouvez nous contacter à :
            </p>
            <p className="italic font-semibold mb-6">
              privacy@digitalprolearning.com
            </p>

          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
