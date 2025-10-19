'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/ui/Button';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const whatsappNumber = "2250123456789"; 
  const whatsappMessage = "Bonjour, je souhaite obtenir des informations sur vos services de création de sites web.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#e8b900]/10 to-white">

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre projet web.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 justify-items-center">
            {/* Contact Info */}
            <div className="max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Parlons de votre projet</h2>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#e8b900]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-[#e8b900] text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email</h3>
                    <p className="text-gray-600 text-sm">contact@digitalprolearning.com</p>
                    <p className="text-gray-600 text-sm">support@digitalprolearning.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#e8b900]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-[#e8b900] text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Téléphone</h3>
                    <p className="text-gray-600 text-sm">+225 01 23 45 6789</p>
                    <p className="text-gray-600 text-sm">Lun-Ven: 9h00-18h00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#e8b900]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-[#e8b900] text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Adresse</h3>
                    <p className="text-gray-600 text-sm">Rue de la République</p>
                    <p className="text-gray-600 text-sm">Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp Button */}
              <div className="mt-6 text-center md:text-left">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#e8b900] text-white px-5 py-2.5 rounded-full hover:bg-[#c29a00] text-sm transition-colors"
                >
                  <i className="ri-whatsapp-line text-lg mr-2"></i>
                  Nous contacter sur WhatsApp
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="max-w-md w-full bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">Envoyez-nous un message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-check-line text-green-500 text-xl"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Message envoyé !</h4>
                  <p className="text-gray-600 text-sm">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 text-sm"
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent text-sm"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent text-sm"
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent text-sm"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      maxLength={500}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8b900] focus:border-transparent resize-none text-sm"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.message.length}/500 caractères
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="md" 
                    disabled={isLoading}
                    className="w-full bg-[#e8b900] hover:bg-[#c29a00] text-white text-sm"
                  >
                    {isLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Envoi...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.000000000000!2d-4.000000!3d5.333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAbidjan%2C%20C%C3%B4te%20d%27Ivoire!5e0!3m2!1sfr!2sfr!4v0000000000000!5m2!1sfr!2sfr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}
