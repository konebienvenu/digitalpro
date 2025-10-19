'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!email) {
      setError('Veuillez renseigner votre adresse email avant d’envoyer le code');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("L'adresse email saisie n'est pas valide");
      return;
    }

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.status === "not-registered") {
          setError("Cet email n'est pas inscrit. Vous pouvez vous inscrire.");
        } else if (data.status === "not-verified") {
          setError("Votre adresse email n'est pas encore vérifiée. Veuillez vérifier votre boîte de réception");
        } else {
          setError(data.message || 'Erreur lors de l’envoi du code');
        }
        return;
      }

      setToken(data.token);
      setStep('otp');
    } catch (err) {
      setError('Erreur réseau, réessayez plus tard');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(paste)) {
      setOtp(paste.split(''));
      document.getElementById(`otp-5`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const codeEntered = otp.join('');
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, code: codeEntered }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Code incorrect ou expiré');
        return;
      }
      window.location.href = `/reset-password?token=${token}`;
    } catch (err) {
      setError('Erreur réseau, réessayez plus tard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#e8b900]50 to-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-12 mb-6">
              Réinitialiser le mot de passe
            </h1>
            {step === 'email' && <p className="text-sm text-gray-600">Entrez votre email pour recevoir un code</p>}
            {step === 'otp' && (
              <p className="text-gray-700 text-sm">
                Un code à 6 chiffres a été envoyé à <strong>{email}</strong>. Entrez-le ci-dessous :
              </p>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {step === 'email' && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <Button onClick={handleSendCode} className="w-full">
                  Envoyer le code
                </Button>
              </>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onPaste={handleOtpPaste}
                    />
                  ))}
                </div>
                <Button onClick={handleVerifyOtp} className="w-full mt-4">
                  Vérifier le code
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-red-500 text-xl font-bold hover:scale-110 transition-transform"
              onClick={() => setError('')}
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="text-center text-gray-800 font-semibold">{error}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
