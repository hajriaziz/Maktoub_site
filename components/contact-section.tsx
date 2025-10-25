import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-hero text-balance mb-6">Restons en Contact</h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto text-pretty">
            Une question, une suggestion ou simplement envie d'échanger ? Nous sommes là pour vous écouter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="p-8 border-0 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-light text-foreground mb-2">
                    Prénom
                  </label>
                  <Input id="firstName" placeholder="foulen" className="font-light" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-light text-foreground mb-2">
                    Nom
                  </label>
                  <Input id="lastName" placeholder="ben foulen" className="font-light" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-foreground mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="foulen.benfoulen@email.com" className="font-light" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-light text-foreground mb-2">
                  Sujet
                </label>
                <Input id="subject" placeholder="Sujet de votre message" className="font-light" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-light text-foreground mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Votre message..." rows={5} className="font-light resize-none" />
              </div>

              <Button size="lg" className="w-full font-light tracking-wide">
                Envoyer le Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-6 text-foreground">Informations de Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-light text-foreground">Email</p>
                    <p className="text-muted-foreground font-light">contact@maktoub.tn</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-light text-foreground">Téléphone</p>
                    <p className="text-muted-foreground font-light">+216 12 345 678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-light text-foreground">Adresse</p>
                    <p className="text-muted-foreground font-light">
                     Tunis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <Card className="p-6 bg-accent/5 border-accent/20 ">
              <h4 className="text-xl font-light mb-4 text-foreground">Newsletter Maktoub</h4>
              <p className="text-muted-foreground font-light mb-4 text-pretty">
                Soyez les premiers informés de nos nouvelles collections et événements exclusifs.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Votre email" className="font-light" />
                <Button variant="outline" className="font-light whitespace-nowrap bg-transparent">
                  S'abonner
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
