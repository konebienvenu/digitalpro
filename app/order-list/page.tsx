'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaCog, FaCheckCircle, FaTimes, FaBell } from 'react-icons/fa';
import Link from 'next/link';

type OrderStatus = 'en cours' | 'traitée' | 'livrée';

interface Order {
  id: number;
  date: string;
  status: OrderStatus;
  description: string;
  paymentMethod: string;
  deliveryAddress: string;
}

interface Message {
  id: number;
  clientMessage: string;
  adminResponse: string;
  clientDate: string;
  adminDate: string;
}

export default function OrderList() {
  const clientName = "Jean Dupont";

  const [orders] = useState<Order[]>([
    { id: 1, date: '2025-07-15T10:00:00Z', status: 'en cours', description: 'Commande site vitrine', paymentMethod: 'Carte', deliveryAddress: 'Abidjan, Côte d’Ivoire' },
    { id: 2, date: '2025-06-20T14:30:00Z', status: 'traitée', description: 'Commande logo + branding', paymentMethod: 'Mobile Money', deliveryAddress: 'Abidjan, Côte d’Ivoire' },
    { id: 3, date: '2025-05-10T09:15:00Z', status: 'livrée', description: 'Refonte site e-commerce', paymentMethod: 'Carte', deliveryAddress: 'Abidjan, Côte d’Ivoire' },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      clientMessage: "J'ai un problème avec le formulaire de contact.",
      adminResponse: "Nous avons corrigé le problème, tout fonctionne maintenant.",
      clientDate: '2025-08-01T12:00:00Z',
      adminDate: '2025-08-03T15:30:00Z',
    },
    {
      id: 2,
      clientMessage: "Le site est lent sur mobile.",
      adminResponse: "Optimisation effectuée, la vitesse a été améliorée.",
      clientDate: '2025-08-05T09:45:00Z',
      adminDate: '2025-08-06T11:15:00Z',
    },
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusBadge = (status: OrderStatus) => {
    const baseClasses = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold";
    switch (status) {
      case 'en cours':
        return <span className={`${baseClasses} bg-yellow-400`}><FaClock /> En attente</span>;
      case 'traitée':
        return <span className={`${baseClasses} bg-orange-400`}><FaCog /> En création</span>;
      case 'livrée':
        return <span className={`${baseClasses} bg-green-500`}><FaCheckCircle /> Site terminé</span>;
      default:
        return <span className={`${baseClasses} bg-gray-400`}>Inconnu</span>;
    }
  };

  const getStatusDetailText = (status: OrderStatus) => {
    switch (status) {
      case 'en cours':
        return "Nous avons bien reçu votre commande. Elle sera traitée très rapidement par notre équipe.";
      case 'traitée':
        return "Nous travaillons actuellement à la création de votre site, étape par étape.";
      case 'livrée':
        return "Votre site est prêt et livré ! Merci pour votre confiance.";
      default:
        return "";
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bonjour';
    if (hour >= 12 && hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const greetingDescription = "Voici la liste de vos différentes commandes. Vous pouvez suivre leur statut en temps réel et accéder aux détails pour chacune d’elles.";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-16 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-4 text-center"
          >
            {getGreeting()} {clientName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-700 text-base max-w-2xl mx-auto mb-10"
          >
            {greetingDescription}
          </motion.p>

          <AnimatePresence>
            {orders.length > 0 && (
              <motion.div
                key="orders"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
                className="space-y-6"
              >
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-start md:justify-between max-w-3xl mx-auto hover:shadow-xl transition"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900">{order.description}</h2>
                      <p className="text-sm text-gray-500 mt-1">Commande n°{order.id}</p>
                      <p className="text-gray-600 mt-1">Passée le : {formatDate(order.date)}</p>
                      <p className="text-sm text-gray-500 mt-1">Mode de paiement : {order.paymentMethod}</p>
                      <p className="text-sm text-gray-500 mt-1">Adresse de livraison : {order.deliveryAddress}</p>
                    </div>
                    <div className="w-full md:w-64 flex-shrink-0 mt-4 md:mt-0 space-y-3">
                      <p className="font-medium text-gray-700 mb-1">Statut :</p>
                      {statusBadge(order.status)}
                      <button
                        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Voir détails
                      </button>

                      {/* Bouton nouveaux messages pour sites livrés uniquement */}
                      {order.status === 'livrée' && (
                        <motion.button
                          className="w-full mt-2 px-4 py-2 bg-green-400 text-white rounded-lg font-medium relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          animate={{ rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 0.4 } }}
                          onClick={() => setShowMessagesModal(true)}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <FaBell className="text-xl" />
                            Nouveaux messages
                          </div>
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      {/* Modal détails commande avec deux boutons pour sites livrés */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-3xl shadow-2xl max-w-md w-full p-8 relative bg-white border-4
                ${selectedOrder.status === 'en cours' ? 'border-yellow-400' :
                  selectedOrder.status === 'traitée' ? 'border-orange-400' :
                    'border-green-500'}`}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setSelectedOrder(null)}
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold mb-4">{selectedOrder.description}</h2>
              <p className="text-gray-600 mb-1">Commande n°{selectedOrder.id}</p>
              <p className="text-gray-600 mb-4">Passée le : {formatDate(selectedOrder.date)}</p>
              <p className="text-gray-700 mb-6">{getStatusDetailText(selectedOrder.status)}</p>

              {selectedOrder.status === 'livrée' && (
                <div className="flex justify-between gap-4">
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-center font-medium hover:bg-green-600 transition"
                  >
                    Voir mon site
                  </a>
                  <Link
                    href="/reclamation"
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-center font-medium hover:bg-red-600 transition"
                  >
                    Réclamation
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal messages reçus */}
      <AnimatePresence>
        {showMessagesModal && (
          <motion.div
            key="messagesModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-gray-200"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowMessagesModal(false)}
              >
                <FaTimes />
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Messages reçus</h2>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{msg.clientMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">Envoyé le : {formatDate(msg.clientDate)}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 ml-4">
                      <p className="text-gray-900">{msg.adminResponse}</p>
                      <p className="text-xs text-gray-500 mt-1">Réponse : {formatDate(msg.adminDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
