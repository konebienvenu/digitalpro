import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Modal({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm text-center relative">
        {type === 'success' ? (
          <FaCheckCircle className="text-[#e8b900] text-6xl mx-auto mb-4 animate-bounce" />
        ) : (
          <FaTimesCircle className="text-red-600 text-6xl mx-auto mb-4 animate-bounce" />
        )}
        <h2 className="text-2xl font-bold mb-2">
          {type === 'success' ? 'Inscription réussie !' : 'Erreur !'}
        </h2>
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className={`mt-6 px-4 py-2 rounded font-semibold shadow-lg hover:scale-105 transition-transform ${
            type === 'success' ? 'bg-[#e8b900] text-white' : 'bg-red-600 text-white'
          }`}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(
          'Merci ! Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail.'
        );
        setEmail('');
        setFirstName('');
      } else {
        // Cas où l'email est déjà inscrit
        if (data.status === 'pending') {
          setStatus('error');
          setMessage(
            "Vous êtes déjà inscrit, mais votre email n'est pas encore validé. Un nouvel email de confirmation vient de vous être envoyé."
          );

          // Appel pour renvoyer un email de confirmation
          await fetch('/api/newsletter/resend-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
        } else if (data.status === 'confirmed') {
          setStatus('error');
          setMessage('Vous êtes déjà inscrit à la newsletter.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Erreur lors de l’inscription.');
        }
      }
    } catch (err) {
      setStatus('error');
      setMessage('Erreur serveur. Veuillez réessayer.');
    }
  };

  const handleCloseModal = () => setStatus('idle');

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1 : About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Digital Pro Learning</h3>
          <p className="text-gray-300 mb-4">
            Accompagner votre réussite digitale avec des formations et services de qualité.
          </p>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-300 hover:text-[#e8b900] transition-transform transform hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Section 2 : Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-300">Email: contact@digitalprolearning.com</p>
          <p className="text-gray-300">Téléphone: +225 07 77 29 93 21</p>
          <p className="text-gray-300">Adresse: Plateau Dokui, Abidjan</p>
        </div>

        {/* Section 3 : Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-gray-300 mb-2">Recevez nos dernières formations et offres :</p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b900]"
            />
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8b900]"
            />
            <button
              type="submit"
              className="bg-[#e8b900] text-white px-4 py-2 rounded font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 pt-6 mt-8">
        <p className="text-gray-300 text-base">
          © 2025 Digital Pro Learning - Tous droits réservés
        </p>
      </div>

      {status === 'success' && <Modal type="success" message={message} onClose={handleCloseModal} />}
      {status === 'error' && <Modal type="error" message={message} onClose={handleCloseModal} />}
    </footer>
  );
}
