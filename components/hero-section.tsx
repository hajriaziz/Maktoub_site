import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/maktoub-vert.jpg" alt="Maktoub Fashion" className="w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-display text-balance mb-6">
          L'élégance moderne
          <br />
          rencontre le streetwear
        </h1>

        <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8 text-pretty">
          Découvrez Maktoub, où chaque pièce raconte une histoire d'authenticité, de style et d'innovation dans
          l'univers de la mode contemporaine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="font-light tracking-wide px-8 py-3">
            Découvrir la Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="font-light tracking-wide px-8 py-3 bg-transparent">
            Voir le Lookbook
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
