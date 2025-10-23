// components/LivraisonDetails.tsx
import React from 'react';

const LivraisonDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec espace depuis la navbar */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900 rounded-3xl mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">Livraison MAKTOUB</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Service de livraison premium dans toute la Tunisie. Rapidité, sécurité et excellence pour votre satisfaction.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Delivery Information */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Delivery Zones Card */}
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-12">
                <div className="w-14 h-14 bg-green-900 rounded-2xl flex items-center justify-center mr-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 tracking-tight">Zones de Livraison</h2>
                  <p className="text-gray-500 mt-2 font-light">Service unifié dans toute la Tunisie</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Grand Tunis */}
                <div className="relative overflow-hidden rounded-2xl p-8 border border-gray-200 bg-gray-50 transform hover:scale-105 transition-all duration-500">
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-white">
                      Express
                    </span>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-green-900 rounded-full mr-4"></div>
                    <h3 className="font-semibold text-gray-900 text-xl">Grand Tunis</h3>
                  </div>
                  <ul className="text-gray-700 space-y-4 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Tunis Centre
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Ariana
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Ben Arous
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Manouba
                    </li>
                  </ul>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-300">
                    <p className="text-gray-900 font-semibold text-lg">Livraison 24h</p>
                    <p className="text-green-900 font-medium">8 DT</p>
                  </div>
                </div>

                {/* Autres Gouvernorats */}
                <div className="relative overflow-hidden rounded-2xl p-8 border border-gray-200 bg-gray-50 transform hover:scale-105 transition-all duration-500">
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-white">
                      Standard
                    </span>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-green-900 rounded-full mr-4"></div>
                    <h3 className="font-semibold text-gray-900 text-xl">Autres Gouvernorats</h3>
                  </div>
                  <ul className="text-gray-700 space-y-4 mb-6">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Sousse, Sfax, Nabeul
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Bizerte, Monastir
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Gabès, Médenine
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Et toutes les autres villes
                    </li>
                  </ul>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-300">
                    <p className="text-gray-900 font-semibold text-lg">Livraison 24-48h</p>
                    <p className="text-green-900 font-medium">8 DT</p>
                  </div>
                </div>
              </div>

              {/* Note importante */}
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-900 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-green-900 font-medium">Échange sous 48h</p>
                    <p className="text-gray-600 text-sm mt-1">Profitez de notre service d'échange dans les 48h suivant la réception de votre commande.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-light text-gray-900 mb-12 tracking-tight">Service Premium MAKTOUB</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-green-800 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Échange Sous 48h</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Service d'échange sans complication dans les 48h suivant la réception.
                  </p>
                </div>

                <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-green-800 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Suivi en Temps Réel</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Notifications instantanées à chaque étape de livraison par SMS et email.
                  </p>
                </div>

                <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-green-800 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Emballage Premium</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Emballage luxueux et sécurisé pour préserver l'excellence de vos articles.
                  </p>
                </div>

                <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-green-800 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">Paiement en Espèces</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                   Uniquement à la livraison.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Important Information */}
          <div className="space-y-8">
            
            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6 flex items-center text-xl">
                <svg className="w-6 h-6 text-green-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact & Support
              </h3>
              
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <p className="font-medium text-green-900 text-sm">Service Client Tunisie</p>
                  <p className="text-gray-900 text-lg font-semibold mt-1">+216 70 123 456</p>
                  <p className="text-gray-600 text-sm mt-1">Lun-Sam: 8h-18h</p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <p className="font-medium text-green-900 text-sm">Email</p>
                  <p className="text-gray-900 font-semibold mt-1">support.tn@maktoub.com</p>
                  <p className="text-gray-600 text-sm mt-1">Réponse sous 24h</p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <p className="font-medium text-gray-900 text-sm">Local Principale</p>
                 <p className="text-gray-900 font-semibold mt-1">Tunis</p>
                </div>
              </div>
            </div>

            {/* Delivery Conditions */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6 text-xl">Conditions de Livraison</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-900 mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Livraison Express 24h</p>
                    <p className="text-gray-600 text-sm">Grand Tunis uniquement</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-900 mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Livraison 24-48h</p>
                    <p className="text-gray-600 text-sm">Autres gouvernorats</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-900 mr-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Échange sous 48h</p>
                    <p className="text-gray-600 text-sm">Avec un frais de 8dt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Hours */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6 text-xl">Horaires de Livraison</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="font-semibold text-green-900">8h - 18h</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Samedi</span>
                  <span className="font-semibold text-green-900">8h - 16h</span>
                </div>
                
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6 text-xl">Paiements Acceptés</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Espèces</span>
                </div>
              
              </div>
            </div>
          </div>
        </div>

       {/* Commitment Section */}
<div className="mt-20 bg-gray-50 rounded-3xl p-16 border border-gray-200">
  <div className="text-center mb-16">
    <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">L'Excellence MAKTOUB</h2>
    <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-light">
      Un engagement inébranlable pour une expérience client exceptionnelle, de la commande à la livraison.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
    <div className="text-center">
      <div className="w-20 h-20 bg-green-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-3">Rapidité</h3>
      <p className="text-gray-600 text-sm leading-relaxed">Livraison express 24h dans Grand Tunis et 24-48h partout ailleurs</p>
    </div>
    
    <div className="text-center">
      <div className="w-20 h-20 bg-green-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-3">Sécurité</h3>
      <p className="text-gray-600 text-sm leading-relaxed">Emballage premium et suivi en temps réel pour une tranquillité d'esprit</p>
    </div>
    
    <div className="text-center">
      <div className="w-20 h-20 bg-green-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-3">Flexibilité</h3>
      <p className="text-gray-600 text-sm leading-relaxed">Échange sous 48h pour une satisfaction garantie</p>
    </div>
    
    <div className="text-center">
      <div className="w-20 h-20 bg-green-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-3">Support</h3>
      <p className="text-gray-600 text-sm leading-relaxed">Équipe dédiée à votre service pour une expérience personnalisée</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default LivraisonDetails;