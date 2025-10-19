'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // Tu peux utiliser une icône si lucide est installé

export default function ReclamationForm() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffdf5] to-white p-4">
      <AnimatePresence>
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 border border-orange-300 font-sans"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Réclamation pour la commande n°{orderId}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-orange-300 rounded"></div>
              <p className="text-gray-700 text-sm font-medium">
                Décrivez votre problème ou votre demande :
              </p>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message ici..."
              className="w-full p-4 border rounded-xl border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm"
              rows={6}
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-orange-400 text-white rounded-xl hover:bg-orange-500 transition font-medium text-sm"
            >
              Envoyer ma réclamation
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-4 border border-green-300 font-sans"
          >
            <div className="flex items-center justify-center space-x-2">
              <p className="text-4xl text-green-400">✅</p>
              <h2 className="text-lg font-semibold text-gray-900 text-left">
                Merci pour votre réclamation !
              </h2>
            </div>
            <p className="text-gray-700 text-sm text-left">
              Nous avons bien reçu votre message et nous vous répondrons rapidement.
            </p>
            <button
              onClick={() => router.push('/order-list')}
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg font-medium text-sm transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à mes commandes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
