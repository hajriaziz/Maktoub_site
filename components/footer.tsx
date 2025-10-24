import { Instagram, Facebook, Video } from "lucide-react"; // Ajoute ces imports
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
 <div className="flex flex-wrap gap-4 justify-center">
  <a
    href="https://www.instagram.com/maktoub_officiel?fbclid=IwY2xjawNl2tVleHRuA2FlbQIxMABicmlkETEyN1BkMkJYNGFNeWRXS1VLAR7ZgYzjn3d5TqrngHfDL4KcKNBO7dSR4dF-N6YqYcjnNit8dPxlaC6_ZUbtng_aem_h3GoFCOMm1Li6hAByp0CCg"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center text-sm sm:text-base"
  >
    <Instagram className="w-5 h-5 mr-2 sm:w-6 sm:h-6" />
    Instagram
  </a>
  <a
    href="https://www.facebook.com/profile.php?id=61570020995556&mibextid=LQQJ4d&rdid=0y1Yr2132F93Cqf7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F183u9PZnKB%2F%3Fmibextid%3DLQQJ4d"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center text-sm sm:text-base"
  >
    <Facebook className="w-5 h-5 mr-2 sm:w-6 sm:h-6" />
    Facebook
  </a>
  <a
    href="https://www.tiktok.com/@maktoub__?_t=8sFTyesRONC&_r=1&fbclid=PAZXh0bgNhZW0CMTEAAadnCH5M82tHy73cxOenJ7Qfd_tQoMx5v3glJ3zXhdmWO7eOD-6CXNhw5h6L1w_aem_fMxN3fCqix3PNzLue_9JUw"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center text-sm sm:text-base"
  >
    <Video className="w-5 h-5 mr-2 sm:w-6 sm:h-6" />
    TikTok
  </a>
</div>
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
                <a href="/livraison" className="hover:text-primary-foreground transition-colors">
                  Livraison
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
          <p className="text-primary-foreground/60 font-light text-sm">© 2024 Maktoub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
