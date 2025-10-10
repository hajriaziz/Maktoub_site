export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-hero text-balance mb-8">L'histoire Maktoub</h2>
            <div className="space-y-6 text-lg font-light text-muted-foreground">
              <p className="text-pretty">
                Maktoub, qui signifie "c'est écrit" en arabe, incarne l'idée que chaque vêtement porte en lui une
                destinée, une histoire unique qui se révèle à travers celui qui le porte.
              </p>
              <p className="text-pretty">
                Notre vision est de créer des pièces intemporelles qui transcendent les tendances éphémères, alliant
                l'authenticité du streetwear à l'élégance du luxe contemporain.
              </p>
              <p className="text-pretty">
                Chaque création Maktoub est pensée pour accompagner votre quotidien avec style, confort et caractère,
                révélant votre personnalité unique dans chaque détail.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src="/fashion-designer-workspace--luxury-streetwear-crea.jpg"
              alt="Atelier Maktoub"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-light mb-3 text-foreground">Authenticité</h3>
            <p className="text-muted-foreground font-light text-pretty">
              Chaque pièce reflète notre vision authentique de la mode contemporaine
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-light mb-3 text-foreground">Qualité</h3>
            <p className="text-muted-foreground font-light text-pretty">
              Des matériaux premium et un savoir-faire artisanal pour une durabilité exceptionnelle
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-light mb-3 text-foreground">Innovation</h3>
            <p className="text-muted-foreground font-light text-pretty">
              Une approche moderne qui repousse les limites du design traditionnel
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
