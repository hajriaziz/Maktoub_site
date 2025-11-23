export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-hero text-balance mb-8">L'histoire Maktoub</h2>
            <div className="space-y-6 text-lg font-light text-muted-foreground">
                  <p className="text-pretty">
      <strong>Maktoub - Là où les vêtements parlent.</strong>
      </p>
              <p className="text-pretty">
                Maktoub, qui signifie "c'est écrit" en arabe, incarne l'idée que chaque vêtement porte en lui une
                destinée, une histoire unique qui se révèle à travers celui qui le porte.
              </p>
              <p className="text-pretty">
                Nous puisons notre inspiration dans l'âme nostalgique de la Tunisie, des tissus ancestraux, des motifs chargés de mémoire.
              </p>
              <p className="text-pretty">
               Imaginez : des pièces uniques qui racontent une histoire, la vôtre et la nôtre. où le passé dialogue avec le présent pour créer un style qui vous est résolument personnel.
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
            <span className="text-2xl">
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6z"/>
  <path d="M9 12l2 2 4-4"/>
</svg>
</span>


            </div>
            <h3 className="text-xl font-light mb-3 text-foreground">Authenticité</h3>
            <p className="text-muted-foreground font-light text-pretty">
              Chaque pièce reflète notre vision authentique de la mode contemporaine
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
<span className="text-2xl">
<svg width="32" height="32" viewBox="0 0 24 24" fill="none"
     stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="5"/>
  <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5"/>
</svg>
</span>



            </div>
            <h3 className="text-xl font-light mb-3 text-foreground">Qualité</h3>
            <p className="text-muted-foreground font-light text-pretty">
              Des matériaux premium et un savoir-faire artisanal pour une durabilité exceptionnelle
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 18h6"/>
  <path d="M10 22h4"/>
  <path d="M6 9a6 6 0 1112 0c0 3-2 5-3 6H9c-1-1-3-3-3-6z"/>
</svg>
</span>


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
