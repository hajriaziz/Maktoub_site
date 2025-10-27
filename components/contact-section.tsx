"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
 const [subscribeEmail, setSubscribeEmail] = useState("")
  const [messageSent, setMessageSent] = useState(false)
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [subscriptionMessage, setSubscriptionMessage] = useState("")

  // Regex pour valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      setEmailError("Veuillez entrer un email valide (ex: exemple@domaine.com)")
      return false
    }
    setEmailError("")
    return true
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(contactForm.email)) return

    const formData = new FormData()
    formData.append("type", "contact")
    formData.append("firstName", contactForm.firstName)
    formData.append("lastName", contactForm.lastName)
    formData.append("email", contactForm.email)
    formData.append("subject", contactForm.subject)
    formData.append("message", contactForm.message)

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      setMessageSent(true)
      setContactForm({ firstName: "", lastName: "", email: "", subject: "", message: "" })
      setEmailError("") // Réinitialiser l'erreur en cas de succès
      setTimeout(() => setMessageSent(false), 3000)
    } else {
      if (data.error.includes("email")) {
        setEmailError("L'email est invalide ou déjà utilisé")
      } else {
        alert(data.error)
      }
    }
  }

const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(subscribeEmail)) return

    const formData = new FormData()
    formData.append("type", "subscribe")
    formData.append("email", subscribeEmail)

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      setSubscriptionSuccess(true)
      setSubscribeEmail("")
      setEmailError("")
      setSubscriptionMessage(data.message) // Afficher le message retourné par l'API
      setTimeout(() => {
        setSubscriptionSuccess(false)
        setSubscriptionMessage("")
      }, 3000)
    } else {
      if (data.error.includes("email")) {
        setEmailError("L'email est invalide")
      } else {
        alert(data.error)
      }
    }
  }

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
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-light text-foreground mb-2">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    value={contactForm.firstName}
                    onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                    placeholder="foulen"
                    className="font-light"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-light text-foreground mb-2">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    value={contactForm.lastName}
                    onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                    placeholder="ben foulen"
                    className="font-light"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="foulen.benfoulen@email.com"
                  className="font-light"
                  required
                />
                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-light text-foreground mb-2">
                  Sujet
                </label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Sujet de votre message"
                  className="font-light"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-light text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={5}
                  className="font-light resize-none"
                  required
                />
              </div>

              <Button size="lg" type="submit" className="w-full font-light tracking-wide">
                Envoyer le Message
                {messageSent && <span className="ml-2 text-green-500">✓</span>}
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
                    <p className="text-muted-foreground font-light">Tunis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h4 className="text-xl font-light mb-4 text-foreground">Newsletter Maktoub</h4>
              <p className="text-muted-foreground font-light mb-4 text-pretty">
                Soyez les premiers informés de nos nouvelles collections et événements exclusifs.
              </p>
              <form onSubmit={handleSubscribeSubmit} className="flex gap-2">
                <div>
                <Input
                  value={subscribeEmail}
                  type="email"
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Votre email"
                  className="font-light"
                  required
                />
                {emailError && <p className="text-sm text-red-500 mt-2">{emailError}</p>}
                {subscriptionMessage && <p className="text-sm text-green-500 mt-1">{subscriptionMessage}</p>}
                </div>
                <Button variant="outline" type="submit" className="font-light whitespace-nowrap bg-transparent">
                  S'abonner
                  {subscriptionSuccess && <span className="ml-2 text-green-500">✓</span>}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}