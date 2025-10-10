export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-light tracking-wide mb-4">MAKTOUB</h3>
            <p className="text-primary-foreground/80 font-light max-w-md text-pretty">
              L'élégance moderne rencontre le streetwear. Chaque pièce raconte une histoire d'authenticité et de style
              contemporain.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Facebook
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-light mb-4">Navigation</h4>
            <ul className="space-y-2 text-primary-foreground/80 font-light">
              <li>
                <a href="#collections" className="hover:text-primary-foreground transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-foreground transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-primary-foreground transition-colors">
                  Lookbook
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-light mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80 font-light">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Guide des Tailles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Retours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 font-light text-sm">© 2025 Maktoub. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light"
            >
              Mentions Légales
            </a>
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light"
            >
              Politique de Confidentialité
            </a>
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm font-light"
            >
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
