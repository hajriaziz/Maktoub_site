export function LookbookSection() {
  const looks = [
    {
      image: "AZU_8261.JPG",
      title: "Urban Minimalist",
      description: "L'essentiel revisité",
    },
    {
      image: "AZU_8283 (1).JPG",
      title: "Street Luxury",
      description: "Élégance décontractée",
    },
    {
      image: "AZU_8279 (1).JPG",
      title: "Contemporary Edge",
      description: "Modernité assumée",
    },
    {
      image: "AZU_8264.JPG",
      title: "Signature Style",
      description: "L'identité Maktoub",
    },
  ]

  return (
    <section id="lookbook" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-hero text-balance mb-6">Lookbook</h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto text-pretty">
            Découvrez comment porter Maktoub à travers nos inspirations styling et nos looks signature.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {looks.map((look, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={look.image || "/placeholder.svg"}
                alt={look.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-light text-lg mb-1">{look.title}</h3>
                <p className="text-sm text-white/80 font-light">{look.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
