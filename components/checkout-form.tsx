"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  })

  const shippingCost = totalPrice >= 100 ? 0 : 9.99
  const finalTotal = totalPrice + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError("")

    try {
      // Préparation des données de commande
      const orderData = {
        customerInfo: formData,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize, // Correction ici
          selectedColor: item.selectedColor, // Correction ici
        })),
        subtotal: totalPrice,
        shippingCost,
        total: finalTotal,
      }

      // Envoi de la commande vers l'API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Échec de la création de la commande")
      }

      // Nettoyer le panier
      clearCart()

      // Redirection vers la page de confirmation
      router.push(`/order-confirmation?orderNumber=${data.orderNumber}`)
    } catch (err: any) {
      console.error("[v0] Erreur création commande:", err)
      setError(err.message || "Une erreur est survenue lors de la création de la commande")
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16 min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground font-light mb-8">Ajoutez des produits avant de passer commande</p>
          <Link href="/collections/all">
            <Button size="lg" className="font-light tracking-wide">
              Découvrir la boutique
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Finaliser la commande</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* === Informations de contact & livraison === */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Informations de contact</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="font-light">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-light">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="font-light">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-light">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Adresse de livraison</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="font-light">
                      Adresse *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="123 Rue de la Mode"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="postalCode" className="font-light">
                        Code postal *
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="75001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="font-light">
                        Ville *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Paris"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="font-light">
                        Pays *
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="France"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-bold mb-6">Mode de paiement</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg bg-primary/5">
                    <input type="radio" id="payment" name="payment" checked readOnly className="h-4 w-4" />
                    <Label htmlFor="payment" className="font-light cursor-pointer flex-1">
                      Paiement à la livraison
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground font-light">
                    Vous paierez en espèces ou par carte lors de la réception de votre commande.
                  </p>
                </div>
              </Card>
            </div>

            {/* === Résumé de commande === */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-serif font-bold mb-6">Récapitulatif</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="flex gap-3"
                    >
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground font-light">
                          {item.selectedSize} • {item.selectedColor} • x{item.quantity}
                        </p>
                        <p className="text-sm font-light text-accent">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-light">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-accent">{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full font-light tracking-wide" disabled={isProcessing}>
                  {isProcessing ? "Traitement en cours..." : "Confirmer la commande"}
                </Button>

                <p className="text-xs text-muted-foreground font-light text-center mt-4">
                  En passant commande, vous acceptez nos conditions générales de vente
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
