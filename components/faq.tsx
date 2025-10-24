import React from "react";

const FAQSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with spacing from navbar */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-chart-3 rounded-3xl mb-8">
            <svg
              className="w-10 h-10 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c-.549-1.165-2.03-2-3.228-2 1.511-2.687 4.622-4.5 8-4.5 4.418 0 8 2.056 8 4.5s-3.582 4.5-8 4.5c-.868 0-1.707-.138-2.5-.395m-3.728 6c-.549-1.165-2.03-2-3.228-2 1.511-2.687 4.622-4.5 8-4.5 4.418 0 8 2.056 8 4.5s-3.582 4.5-8 4.5c-.868 0-1.707-.138-2.5-.395"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-light text-foreground mb-6 tracking-tight">
            FAQ MAKTOUB
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Retrouvez les réponses à vos questions fréquentes sur nos services et produits.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - FAQ Questions */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-background rounded-3xl p-12 border border-border shadow-sm">
              <h2 className="text-3xl font-light text-foreground mb-12 tracking-tight">
                Questions Fréquentes
              </h2>

              <div className="space-y-8">
                {/* FAQ Item 1 */}
                <div className="group p-8 rounded-2xl border border-border hover:border-accent hover:bg-secondary transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-chart-3 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-chart-3 transition-colors">
                      <svg
                        className="w-6 h-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M9 16a1 1 0 01-1-1V8a1 1 0 011-1h6a1 1 0 011 1v7a1 1 0 01-1 1h-2"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Quels sont les délais de livraison ?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Les délais varient selon la zone : 24h pour le Grand Tunis et 24-48h pour les autres gouvernorats.
                  </p>
                </div>

                {/* FAQ Item 2 */}
                <div className="group p-8 rounded-2xl border border-border hover:border-accent hover:bg-secondary transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-chart-3 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-chart-3 transition-colors">
                      <svg
                        className="w-6 h-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Comment suivre ma commande ?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Vous recevrez des notifications par SMS et email avec un lien de suivi en temps réel.
                  </p>
                </div>

                {/* FAQ Item 3 */}
                <div className="group p-8 rounded-2xl border border-border hover:border-accent hover:bg-secondary transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-chart-3 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-chart-3 transition-colors">
                      <svg
                        className="w-6 h-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Puis-je retourner un article ?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Oui, vous pouvez échanger un article sous 48h avec un frais de 8 DT.
                  </p>
                </div>

                {/* FAQ Item 4 */}
                <div className="group p-8 rounded-2xl border border-border hover:border-accent hover:bg-secondary transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-chart-3 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-chart-3 transition-colors">
                      <svg
                        className="w-6 h-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">Quels sont les modes de paiement ?</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous acceptons uniquement le paiement en espèces à la livraison.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Support */}
          <div className="space-y-8">
            <div className="bg-background rounded-3xl p-8 border border-border shadow-sm">
              <h3 className="font-semibold text-foreground mb-6 flex items-center text-xl">
                <svg
                  className="w-6 h-6 text-accent mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact & Support
              </h3>

              <div className="space-y-5">
                <div className="bg-secondary rounded-2xl p-5 border border-border">
                  <p className="font-medium text-accent text-sm">Service Client Tunisie</p>
                  <p className="text-foreground text-lg font-semibold mt-1">+216 70 123 456</p>
                  <p className="text-muted-foreground text-sm mt-1">Lun-Sam: 8h-18h</p>
                </div>
                <p>ameni</p>

                <div className="bg-secondary rounded-2xl p-5 border border-border">
                  <p className="font-medium text-accent text-sm">Email</p>
                  <p className="text-foreground font-semibold mt-1">support.tn@maktoub.com</p>
                  <p className="text-muted-foreground text-sm mt-1">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default FAQSection;