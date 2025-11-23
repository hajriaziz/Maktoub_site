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
    country: "",
  })

  const shippingCost = totalPrice >= 100 ? 0 : 8
  const finalTotal = totalPrice + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Fonction pour envoyer l'email de confirmation
  const handleOrderConfirmation = async (orderId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/send-email.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commandeId: orderId }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Erreur envoi email:', result.error);
        // Continuer même si l'email échoue
      } else {
        console.log('Email envoyé:', result.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  };

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
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        subtotal: totalPrice,
        shippingCost,
        total: finalTotal,
      }

      // Envoi de la commande vers l'API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch((`${apiUrl}/orders.php`), {
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

      // ENVOYER L'EMAIL DE CONFIRMATION
      await handleOrderConfirmation(data.orderId);

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
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-sans font-medium  mb-8">Finaliser mon look</h1>

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
                <h2 className="text-2xl font-serif font-light mb-6">Informations de contact</h2>
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
                        placeholder="foulen"
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
                        placeholder="ben foulen"
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
                        placeholder="foulen.benfoulen@email.com"
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
                        placeholder="+216 99 999 999"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-light mb-6">Adresse de livraison</h2>
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
                      placeholder="12 nahj lhob "
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="postalCode" className="font-light">
                        Code postal (optionel)
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="2050"
                      />
                    </div>
                  <div>
                    <Label htmlFor="city" className="font-light">
                      Ville ou Gouvernorat *
                    </Label>
                    <select
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-2 border rounded-lg bg-background/80 font-light "
                    >
                      <option value="">Sélectionner une ville</option>
                      <optgroup label="Tunis">
                        <option value="Tunis">Tunis</option>
                        <option value="La Marsa">La Marsa</option>
                        <option value="Carthage">Carthage</option>
                        <option value="Sidi Bou Saïd">Sidi Bou Saïd</option>
                        <option value="Le Bardo">Le Bardo</option>
                      </optgroup>
                      <optgroup label="Ariana">
                        <option value="Ariana">Ariana</option>
                        <option value="La Soukra">La Soukra</option>
                        <option value="Raoued">Raoued</option>
                        <option value="Kalaat el-Andalous">Kalaat el-Andalous</option>
                      </optgroup>
                      <optgroup label="Ben Arous">
                        <option value="Ben Arous">Ben Arous</option>
                        <option value="Ezzahra">Ezzahra</option>
                        <option value="Rades">Rades</option>
                        <option value="Hammam Lif">Hammam Lif</option>
                        <option value="Hammam Chatt">Hammam Chatt</option>
                        <option value="Mégrine">Mégrine</option>
                      </optgroup>
                      <optgroup label="Manouba">
                        <option value="Manouba">Manouba</option>
                        <option value="Oued Ellil">Oued Ellil</option>
                        <option value="Douar Hicher">Douar Hicher</option>
                        <option value="Den Den">Den Den</option>
                      </optgroup>
                      <optgroup label="Nabeul">
                        <option value="Nabeul">Nabeul</option>
                        <option value="Hammamet">Hammamet</option>
                        <option value="Kelibia">Kelibia</option>
                        <option value="Korba">Korba</option>
                        <option value="Menzel Temime">Menzel Temime</option>
                        <option value="Dar Chaabane">Dar Chaabane</option>
                      </optgroup>
                      <optgroup label="Sousse">
                        <option value="Sousse">Sousse</option>
                        <option value="Hammam Sousse">Hammam Sousse</option>
                        <option value="Akouda">Akouda</option>
                        <option value="Msaken">Msaken</option>
                        <option value="Enfidha">Enfidha</option>
                      </optgroup>
                      <optgroup label="Monastir">
                        <option value="Monastir">Monastir</option>
                        <option value="Ksar Hellal">Ksar Hellal</option>
                        <option value="Sahline">Sahline</option>
                        <option value="Jemmal">Jemmal</option>
                        <option value="Sayada">Sayada</option>
                      </optgroup>
                      <optgroup label="Mahdia">
                        <option value="Mahdia">Mahdia</option>
                        <option value="Chebba">Chebba</option>
                        <option value="El Jem">El Jem</option>
                        <option value="Ksour Essef">Ksour Essef</option>
                      </optgroup>
                      <optgroup label="Sfax">
                        <option value="Sfax">Sfax</option>
                        <option value="Sakiet Ezzit">Sakiet Ezzit</option>
                        <option value="Sakiet Eddaier">Sakiet Eddaier</option>
                        <option value="Thyna">Thyna</option>
                        <option value="Mahres">Mahres</option>
                      </optgroup>
                      <optgroup label="Kairouan">
                        <option value="Kairouan">Kairouan</option>
                        <option value="Haffouz">Haffouz</option>
                        <option value="Nasrallah">Nasrallah</option>
                        <option value="Sbikha">Sbikha</option>
                      </optgroup>
                      <optgroup label="Sidi Bouzid">
                        <option value="Sidi Bouzid">Sidi Bouzid</option>
                        <option value="Regueb">Regueb</option>
                        <option value="Menzel Bouzaiane">Menzel Bouzaiane</option>
                        <option value="Meknassy">Meknassy</option>
                      </optgroup>
                      <optgroup label="Kasserine">
                        <option value="Kasserine">Kasserine</option>
                        <option value="Feriana">Feriana</option>
                        <option value="Thala">Thala</option>
                        <option value="Sbeitla">Sbeitla</option>
                      </optgroup>
                      <optgroup label="Gafsa">
                        <option value="Gafsa">Gafsa</option>
                        <option value="Metlaoui">Metlaoui</option>
                        <option value="Redeyef">Redeyef</option>
                        <option value="El Ksar">El Ksar</option>
                      </optgroup>
                      <optgroup label="Tozeur">
                        <option value="Tozeur">Tozeur</option>
                        <option value="Nefta">Nefta</option>
                        <option value="Degache">Degache</option>
                      </optgroup>
                      <optgroup label="Kébili">
                        <option value="Kébili">Kébili</option>
                        <option value="Douz">Douz</option>
                        <option value="Souk Lahad">Souk Lahad</option>
                      </optgroup>
                      <optgroup label="Gabès">
                        <option value="Gabès">Gabès</option>
                        <option value="Mareth">Mareth</option>
                        <option value="Métouia">Métouia</option>
                        <option value="Ghannouch">Ghannouch</option>
                      </optgroup>
                      <optgroup label="Medenine">
                        <option value="Medenine">Medenine</option>
                        <option value="Zarzis">Zarzis</option>
                        <option value="Ben Gardane">Ben Gardane</option>
                        <option value="Houmt Souk (Djerba)">Houmt Souk (Djerba)</option>
                      </optgroup>
                      <optgroup label="Tataouine">
                        <option value="Tataouine">Tataouine</option>
                        <option value="Ghomrassen">Ghomrassen</option>
                        <option value="Remada">Remada</option>
                      </optgroup>
                      <optgroup label="Bizerte">
                        <option value="Bizerte">Bizerte</option>
                        <option value="Mateur">Mateur</option>
                        <option value="Menzel Bourguiba">Menzel Bourguiba</option>
                        <option value="Ras Jebel">Ras Jebel</option>
                      </optgroup>
                      <optgroup label="Béja">
                        <option value="Béja">Béja</option>
                        <option value="Medjez el-Bab">Medjez el-Bab</option>
                        <option value="Testour">Testour</option>
                      </optgroup>
                      <optgroup label="Jendouba">
                        <option value="Jendouba">Jendouba</option>
                        <option value="Tabarka">Tabarka</option>
                        <option value="Ghardimaou">Ghardimaou</option>
                      </optgroup>
                      <optgroup label="Le Kef">
                        <option value="Le Kef">Le Kef</option>
                        <option value="Tajerouine">Tajerouine</option>
                        <option value="Nebeur">Nebeur</option>
                      </optgroup>
                      <optgroup label="Siliana">
                        <option value="Siliana">Siliana</option>
                        <option value="Gaafour">Gaafour</option>
                        <option value="Makthar">Makthar</option>
                      </optgroup>
                      <optgroup label="Zaghouan">
                        <option value="Zaghouan">Zaghouan</option>
                        <option value="El Fahs">El Fahs</option>
                        <option value="Nadhour">Nadhour</option>
                      </optgroup>

                    </select>
                  </div>
                    <div>
                      <Label htmlFor="country" className="font-light">
                        Pays (optionel)
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Tunisie"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-2xl font-serif font-light mb-6">Mode de paiement</h2>
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
                <h2 className="text-2xl font-sans font-medium mb-6">Récapitulatif</h2>

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
                          {(item.product.price * item.quantity).toFixed(2)}TND
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
                    <span>{totalPrice.toFixed(2)}TND</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}TND`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-light">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-accent">{finalTotal.toFixed(2)}TND</span>
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