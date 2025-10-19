'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function NewsletterConfirmed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already' | 'already_pending'>('loading');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage("Nous n'avons pas trouvé de token pour confirmer votre inscription à la newsletter.");
      setShowModal(true);
      return;
    }

    fetch(`/api/newsletter/confirm?token=${token}&_=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status || 'error');

        switch (data.status) {
          case 'success':
            setMessage("Merci ! Votre inscription à notre newsletter est confirmée. Vous commencerez bientôt à recevoir nos dernières actualités, astuces et offres exclusives directement dans votre boîte mail !");
            break;
          case 'already':
            setMessage("Vous êtes déjà inscrit à notre newsletter et votre adresse a déjà été confirmée. Pas besoin de confirmer à nouveau !");
            break;
          case 'already_pending':
            setMessage("Vous êtes déjà inscrit à la newsletter, mais votre adresse n'est pas encore confirmée. Vérifiez votre boîte mail pour confirmer votre inscription. Un email de confirmation peut avoir été renvoyé si 24h se sont écoulées depuis le dernier envoi.");
            break;
          default:
            setMessage("Une erreur est survenue lors de la confirmation de votre newsletter. Veuillez réessayer plus tard.");
            break;
        }

        setShowModal(true);
      })
      .catch(err => {
        console.error(err);
        setStatus('error');
        setMessage("Erreur serveur lors de la confirmation de votre newsletter.");
        setShowModal(true);
      });
  }, [token]);

  const getColor = () => {
    if (status === 'success') return '#111827';
    if (status === 'already' || status === 'already_pending') return '#dc2626';
    return '#dc2626';
  };

  const handleReturn = () => {
    router.push('/');
  };

  return (
    <>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '400px', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)', textAlign: 'center'
          }}>
            <h2 style={{ color: getColor(), fontSize: '24px', marginBottom: '1rem' }}>
              {status === 'success' ? 'Newsletter confirmée !' :
               status === 'already' ? 'Newsletter déjà confirmée' :
               status === 'already_pending' ? 'Confirmation en attente' :
               'Erreur'}
            </h2>
            <p style={{ fontSize: '16px', color: '#374151', marginBottom: '2rem' }}>{message}</p>
            <button
              onClick={handleReturn}
              style={{
                backgroundColor: '#e8b900',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Retour à l’accueil
            </button>
          </div>
        </div>
      )}
    </>
  );
}
