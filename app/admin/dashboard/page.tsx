
'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';

interface Order {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  siteType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  objectives: string;
  logo?: string;
  additionalInfo?: string;
  autoProgressDate?: string;
  estimatedCompletion?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '001',
      organizationName: 'Église Évangélique de Cocody',
      contactName: 'Pasteur Jean Kouame',
      email: 'pasteur@eglise-cocody.ci',
      phone: '+225 07 12 34 56 78',
      whatsapp: '+225 07 12 34 56 78',
      siteType: 'Site institutionnel',
      status: 'in-progress',
      createdAt: '2024-01-15',
      objectives: 'Présenter notre église, partager les sermons en ligne, informer la communauté sur les événements à venir, créer un espace de prière en ligne, permettre les dons sécurisés, avoir une galerie photo des activités',
      logo: 'https://readdy.ai/api/search-image?query=Christian%20church%20cross%20logo%2C%20religious%20symbol%2C%20golden%20cross%20with%20dove%2C%20spiritual%20emblem%2C%20clean%20white%20background%2C%20centered%20composition%2C%20holy%20spirit%20representation&width=200&height=200&seq=church-logo-001&orientation=squarish',
      additionalInfo: 'Couleurs préférées: Bleu royal et doré. Style moderne mais respectueux. Inspiration: site de Hillsong Church. Sections importantes: Sermons, Événements, Dons, Prière en ligne, Équipe pastorale. Délai souhaité: avant dimanche prochain',
      estimatedCompletion: '2024-01-18'
    },
    {
      id: '002',
      organizationName: 'Restaurant Chez Mamie',
      contactName: 'Marie Adjoua',
      email: 'marie@chezmamie.ci',
      phone: '+225 05 98 76 54 32',
      whatsapp: '+225 05 98 76 54 32',
      siteType: 'Site vitrine',
      status: 'pending',
      createdAt: '2024-01-14',
      objectives: 'Présenter notre menu traditionnel ivoirien, permettre les réservations en ligne, montrer l\'ambiance chaleureuse du restaurant, afficher les avis clients, promouvoir nos plats du jour et spécialités',
      logo: 'https://readdy.ai/api/search-image?query=African%20restaurant%20logo%2C%20traditional%20cooking%20pot%2C%20warm%20colors%2C%20chef%20hat%20with%20African%20patterns%2C%20food%20service%20emblem%2C%20white%20background%2C%20centered%2C%20cultural%20dining&width=200&height=200&seq=restaurant-logo-002&orientation=squarish',
      additionalInfo: 'Couleurs: Orange, rouge et vert (couleurs du drapeau). Style chaleureux et familial. Référence: site de African Kitchen Paris. Sections: Menu, Réservation, Galerie, Témoignages, Contact. Livraison possible à ajouter',
      autoProgressDate: '2024-01-16'
    },
    {
      id: '003',
      organizationName: 'Boutique Mode Africaine',
      contactName: 'Fatoumata Diallo',
      email: 'fatou@modeafricaine.ci',
      phone: '+225 01 23 45 67 89',
      whatsapp: '+225 01 23 45 67 89',
      siteType: 'Site e-commerce',
      status: 'completed',
      createdAt: '2024-01-10',
      objectives: 'Vendre nos créations de mode africaine en ligne, présenter nos collections saisonnières, fidéliser la clientèle avec un programme de points, offrir la personnalisation de vêtements, créer une communauté mode',
      logo: 'https://readdy.ai/api/search-image?query=African%20fashion%20boutique%20logo%2C%20traditional%20textile%20patterns%2C%20elegant%20dress%20silhouette%2C%20kente%20colors%2C%20fashion%20brand%20emblem%2C%20white%20background%2C%20stylish%20design&width=200&height=200&seq=fashion-logo-003&orientation=squarish',
      additionalInfo: 'Couleurs: Kente traditionnels (jaune, rouge, noir, vert). Style élégant et moderne. Inspiration: site de Vlisco. Fonctionnalités: Catalogue produits, Panier, Paiement mobile money, Personnalisation, Blog mode, Programme fidélité'
    },
    {
      id: '004',
      organizationName: 'Cabinet Dentaire Dr. Kone',
      contactName: 'Dr. Amadou Kone',
      email: 'dr.kone@dentiste.ci',
      phone: '+225 07 11 22 33 44',
      whatsapp: '+225 07 11 22 33 44',
      siteType: 'Site vitrine',
      status: 'cancelled',
      createdAt: '2024-01-12',
      objectives: 'Présenter nos services dentaires, permettre la prise de rendez-vous en ligne, éduquer les patients sur l\'hygiène dentaire, présenter l\'équipe médicale, rassurer les patients anxieux',
      logo: 'https://readdy.ai/api/search-image?query=Dental%20clinic%20logo%2C%20tooth%20with%20medical%20cross%2C%20clean%20medical%20design%2C%20blue%20and%20white%20colors%2C%20healthcare%20symbol%2C%20professional%20dentist%20emblem%2C%20white%20background&width=200&height=200&seq=dental-logo-004&orientation=squarish',
      additionalInfo: 'Couleurs: Bleu médical et blanc. Style professionnel et rassurant. Sections: Services, Équipe, Rendez-vous, Conseils santé, Urgences. Certificats et diplômes à mettre en avant'
    },
    {
      id: '005',
      organizationName: 'Association Jeunesse Espoir',
      contactName: 'Kofi Asante',
      email: 'kofi@jeunesse-espoir.org',
      phone: '+225 05 44 55 66 77',
      whatsapp: '+225 05 44 55 66 77',
      siteType: 'Site institutionnel',
      status: 'in-progress',
      createdAt: '2024-01-13',
      objectives: 'Présenter nos actions sociales auprès des jeunes, recruter des bénévoles actifs, collecter des dons pour nos projets, partager les success stories, créer un réseau de partenaires',
      logo: 'https://readdy.ai/api/search-image?query=Youth%20association%20logo%2C%20helping%20hands%2C%20heart%20symbol%2C%20hope%20and%20unity%2C%20vibrant%20colors%2C%20community%20support%20emblem%2C%20white%20background%2C%20inspirational%20design&width=200&height=200&seq=youth-logo-005&orientation=squarish',
      additionalInfo: 'Couleurs: Vert espoir et orange dynamique. Style inspirant et énergique. Sections: Nos missions, Projets, Bénévolat, Dons, Témoignages, Partenaires. Galerie photo des actions importantes',
      estimatedCompletion: '2024-01-17'
    }
  ]);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleAutoProgress = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowAutoModal(true);
  };

  const setAutoProgress = (hours: number) => {
    const progressDate = new Date();
    progressDate.setHours(progressDate.getHours() + hours);

    setOrders(prev => prev.map(order =>
      order.id === selectedOrderId
        ? { ...order, autoProgressDate: progressDate.toISOString() }
        : order
    ));

    setShowAutoModal(false);
    setSelectedOrderId('');
    setTimeout(() => {
      setOrders(prev => prev.map(order =>
        order.id === selectedOrderId && order.status === 'pending'
          ? { ...order, status: 'in-progress' }
          : order
      ));
    }, hours * 60 * 60 * 1000);
  };

  const bulkStatusChange = (newStatus: Order['status']) => {
    const selectedOrders = orders.filter(order => order.status === 'pending');
    selectedOrders.forEach(order => {
      handleStatusChange(order.id, newStatus);
    });
  };

  const showOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getSiteTypeText = (siteType: string) => {
    switch (siteType) {
      case 'vitrine':
        return 'Site vitrine';
      case 'ecommerce':
        return 'Site e-commerce';
      case 'blog':
        return 'Blog / Site d\'actualités';
      case 'portfolio':
        return 'Portfolio';
      case 'evenementiel':
        return 'Site événementiel';
      case 'institutionnel':
        return 'Site institutionnel';
      default:
        return siteType;
    }
  };

  const getStatistics = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const inProgress = orders.filter(o => o.status === 'in-progress').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;

    return { total, pending, inProgress, completed, cancelled };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
                <p className="text-xl text-gray-600">Gestion des commandes et administration</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <i className="ri-admin-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Administrateur</p>
                  <p className="text-sm text-gray-600">Digital Pro Learning</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-file-list-3-line text-gray-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">En attente</p>
                    <p className="text-3xl font-bold text-yellow-800">{stats.pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="ri-time-line text-yellow-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">En cours</p>
                    <p className="text-3xl font-bold text-blue-800">{stats.inProgress}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-loader-4-line text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Terminés</p>
                    <p className="text-3xl font-bold text-green-800">{stats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Annulés</p>
                    <p className="text-3xl font-bold text-red-800">{stats.cancelled}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <i className="ri-close-line text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'orders'
                      ? 'bg-red-50 text-red-600 border-b-2 border-red-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  Commandes ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'settings'
                      ? 'bg-red-50 text-red-600 border-b-2 border-red-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-settings-line mr-2"></i>
                  Paramètres
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des commandes</h2>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => bulkStatusChange('in-progress')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors !rounded-button"
                      >
                        <i className="ri-play-line mr-2"></i>
                        Démarrer toutes les commandes en attente
                      </button>
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="in-progress">En cours</option>
                        <option value="completed">Terminé</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <h3 className="text-xl font-bold text-gray-900">#{order.id} - {order.organizationName}</h3>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              {order.autoProgressDate && (
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                                  <i className="ri-timer-line mr-1"></i>
                                  Auto-progression
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Contact</p>
                                <p className="text-gray-900">{order.contactName}</p>
                                <p className="text-sm text-gray-600">{order.email}</p>
                                <p className="text-sm text-gray-600">{order.phone}</p>
                                {order.whatsapp && (
                                  <p className="text-sm text-green-600">
                                    <i className="ri-whatsapp-line mr-1"></i>
                                    {order.whatsapp}
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Type de site</p>
                                <p className="text-gray-900">{getSiteTypeText(order.siteType)}</p>
                                <p className="text-sm font-medium text-gray-600 mt-2 mb-1">Date de commande</p>
                                <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Logo fourni</p>
                                <div className="flex items-center gap-2">
                                  {order.logo ? (
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={order.logo}
                                        alt="Logo"
                                        className="w-8 h-8 rounded object-cover border"
                                      />
                                      <span className="text-green-600 text-sm">Oui</span>
                                    </div>
                                  ) : (
                                    <span className="text-red-600 text-sm">Non</span>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-600 mt-2 mb-1">Infos supplémentaires</p>
                                <p className="text-sm text-gray-600">
                                  {order.additionalInfo ? 'Oui' : 'Non'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Objectifs</p>
                                <p className="text-sm text-gray-700 line-clamp-2">{order.objectives}</p>
                                <button
                                  onClick={() => showOrderDetails(order)}
                                  className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                                >
                                  <i className="ri-eye-line mr-1"></i>
                                  Voir tous les détails
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <button
                                onClick={() => handleStatusChange(order.id, 'pending')}
                                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                                  order.status === 'pending'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                }`}
                              >
                                En attente
                              </button>
                              <button
                                onClick={() => handleStatusChange(order.id, 'in-progress')}
                                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                                  order.status === 'in-progress'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                }`}
                              >
                                En cours
                              </button>
                              <button
                                onClick={() => handleStatusChange(order.id, 'completed')}
                                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                                  order.status === 'completed'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                              >
                                Terminé
                              </button>
                              <button
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                                  order.status === 'cancelled'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                Annuler
                              </button>
                            </div>

                            {order.status === 'pending' && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-blue-900">Progression automatique</p>
                                    <p className="text-xs text-blue-700">Programmer le passage automatique vers "En cours"</p>
                                  </div>
                                  <button
                                    onClick={() => handleAutoProgress(order.id)}
                                    className="px-3 py-2 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors !rounded-button"
                                  >
                                    <i className="ri-timer-line mr-1"></i>
                                    Programmer
                                  </button>
                                </div>
                              </div>
                            )}

                            {order.estimatedCompletion && order.status === 'in-progress' && (
                              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-green-900">Fin estimée</p>
                                    <p className="text-xs text-green-700">{new Date(order.estimatedCompletion).toLocaleDateString('fr-FR')}</p>
                                  </div>
                                  <button
                                    onClick={() => handleStatusChange(order.id, 'completed')}
                                    className="px-3 py-2 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors !rounded-button"
                                  >
                                    <i className="ri-check-line mr-1"></i>
                                    Marquer terminé
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">Paramètres administrateur</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la plateforme</label>
                          <input
                            type="text"
                            defaultValue="Digital Pro Learning"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
                          <input
                            type="email"
                            defaultValue="contact@digitalprolearning.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres des commandes</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prix mensuel (FCFA)</label>
                          <input
                            type="number"
                            defaultValue="10000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Délai de livraison (heures)</label>
                          <input
                            type="number"
                            defaultValue="48"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 !rounded-button">
                      <i className="ri-save-line mr-2"></i>
                      Enregistrer les modifications
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="!rounded-button">
                        <i className="ri-home-line mr-2"></i>
                        Retour à l'accueil
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showAutoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Programmer la progression</h3>
            <p className="text-gray-600 mb-6">Dans combien de temps cette commande doit-elle passer en "En cours" automatiquement ?</p>

            <div className="space-y-3">
              <button
                onClick={() => setAutoProgress(1)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-medium">Dans 1 heure</div>
                <div className="text-sm text-gray-600">Progression rapide</div>
              </button>
              <button
                onClick={() => setAutoProgress(6)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-medium">Dans 6 heures</div>
                <div className="text-sm text-gray-600">Progression normale</div>
              </button>
              <button
                onClick={() => setAutoProgress(24)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-medium">Dans 24 heures</div>
                <div className="text-sm text-gray-600">Progression planifiée</div>
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAutoModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors !rounded-button"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Détails complets - #{selectedOrder.id}
                  </h2>
                  <p className="text-gray-600">{selectedOrder.organizationName}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-information-line mr-2 text-blue-500"></i>
                  Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Organisation</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-900 font-medium">{selectedOrder.organizationName}</p>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.organizationName)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-900">{selectedOrder.contactName}</p>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.contactName)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-900">{selectedOrder.email}</p>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.email)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Téléphone</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-900">{selectedOrder.phone}</p>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.phone)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </div>
                    </div>
                    {selectedOrder.whatsapp && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-green-600">
                            <i className="ri-whatsapp-line mr-1"></i>
                            {selectedOrder.whatsapp}
                          </p>
                          <button
                            onClick={() => copyToClipboard(selectedOrder.whatsapp!)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <i className="ri-file-copy-line"></i>
                          </button>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type de site</label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-900">{getSiteTypeText(selectedOrder.siteType)}</p>
                        <button
                          onClick={() => copyToClipboard(getSiteTypeText(selectedOrder.siteType))}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-file-copy-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.logo && (
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="ri-image-line mr-2 text-blue-500"></i>
                    Logo fourni
                  </h3>
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedOrder.logo}
                      alt="Logo de l'organisation"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">Logo de l'organisation disponible pour intégration</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(selectedOrder.logo, '_blank')}
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors !rounded-button"
                        >
                          <i className="ri-external-link-line mr-2"></i>
                          Ouvrir en grand
                        </button>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.logo!)}
                          className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors !rounded-button"
                        >
                          <i className="ri-file-copy-line mr-2"></i>
                          Copier le lien
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-target-line mr-2 text-green-500"></i>
                  Objectifs du site web
                </h3>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-gray-900 leading-relaxed">{selectedOrder.objectives}</p>
                  <button
                    onClick={() => copyToClipboard(selectedOrder.objectives)}
                    className="mt-3 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full hover:bg-green-200 transition-colors"
                  >
                    <i className="ri-file-copy-line mr-1"></i>
                    Copier le texte
                  </button>
                </div>
              </div>

              {selectedOrder.additionalInfo && (
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="ri-palette-line mr-2 text-purple-500"></i>
                    Spécifications de design et exigences
                  </h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-line">{selectedOrder.additionalInfo}</p>
                    <button
                      onClick={() => copyToClipboard(selectedOrder.additionalInfo!)}
                      className="mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
                    >
                      <i className="ri-file-copy-line mr-1"></i>
                      Copier les spécifications
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-calendar-line mr-2 text-yellow-500"></i>
                  Informations de commande
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date de commande</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Statut actuel</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-tools-line mr-2 text-gray-600"></i>
                  Actions rapides
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const allInfo = `
COMMANDE #${selectedOrder.id}

ORGANISATION: ${selectedOrder.organizationName}
CONTACT: ${selectedOrder.contactName}
EMAIL: ${selectedOrder.email}
TÉLÉPHONE: ${selectedOrder.phone}
${selectedOrder.whatsapp ? `WHATSAPP: ${selectedOrder.whatsapp}` : ''}
  
TYPE DE SITE: ${getSiteTypeText(selectedOrder.siteType)}
  
OBJECTIFS:
${selectedOrder.objectives}
  
${selectedOrder.additionalInfo ? `SPÉCIFICATIONS DESIGN:
${selectedOrder.additionalInfo}` : ''}
  
${selectedOrder.logo ? `LOGO FOURNI: ${selectedOrder.logo}` : 'LOGO: Non fourni'}
  
DATE DE COMMANDE: ${new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR')}
                      `.trim();
                      copyToClipboard(allInfo);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors !rounded-button"
                  >
                    <i className="ri-file-copy-line mr-2"></i>
                    Copier toutes les informations
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'in-progress')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors !rounded-button"
                  >
                    <i className="ri-play-line mr-2"></i>
                    Démarrer le projet
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${selectedOrder.email}?subject=Votre commande de site web #${selectedOrder.id}`, '_blank')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors !rounded-button"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contacter le client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
