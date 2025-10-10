"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber") || "MKT-000000"

  return (
    <div className="pt-20 pb-16 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-8 text-center">
          <CheckCircle2 className="h-20 w-20 mx-auto mb-6 text-green-500" />
          <h1 className="text-4xl font-serif font-bold mb-4">Commande confirmée!</h1>
          <p className="text-lg text-muted-foreground font-light mb-6">
            Merci pour votre commande. Nous avons bien reçu votre demande et elle a été enregistrée dans notre système.
          </p>

          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground font-light mb-2">Numéro de commande</p>
            <p className="text-2xl font-light text-accent">{orderNumber}</p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground font-light mb-8 text-left">
            <p>✓ Un email de confirmation a été envoyé à votre adresse</p>
            <p>✓ Votre commande sera préparée dans les 24-48h</p>
            <p>✓ Vous recevrez un email avec le suivi de livraison</p>
            <p>✓ Livraison estimée: 3-5 jours ouvrés</p>
            <p>✓ Le stock a été mis à jour automatiquement</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections/all">
              <Button size="lg" variant="outline" className="font-light tracking-wide bg-transparent w-full sm:w-auto">
                Continuer mes achats
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" className="font-light tracking-wide w-full sm:w-auto">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
