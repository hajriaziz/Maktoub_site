"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16 min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-sans font-medium mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground font-light mb-8">
            Découvrez nos collections et ajoutez des produits à votre panier.
          </p>
          <Link href="/collections">
            <Button size="lg" className="font-light tracking-wide">
              Découvrir la boutique
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const shippingCost = totalPrice >= 100 ? 0 : 8.00
  const finalTotal = totalPrice + shippingCost

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-ligth  mb-8">
          Mon look en attente ({totalItems})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🛍️ Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
  {items.map((item, index) => (
    <Card
      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
      className="p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Image produit */}
        <Link
          href={`/products/${item.product.slug}`}
          className="flex-shrink-0"
        >
          <img
            src={item.product.images?.[0] || "/placeholder.svg"}
            alt={item.product.name}
            className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto sm:mx-0"
          />
        </Link>

        {/* Infos + Actions */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Nom + Prix */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="min-w-0">
              <Link href={`/products/${item.product.slug}`}>
                <h3 className="text-base sm:text-lg font-light hover:text-accent transition-colors line-clamp-2">
                  {item.product.name}
                </h3>
              </Link>
              {item.product.category && (
                <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
                  {item.product.category}
                </p>
              )}
            </div>
            <p className="text-base sm:text-lg font-light text-accent whitespace-nowrap">
              {Number(item.product.price).toFixed(2)} TND
            </p>
          </div>

          {/* Taille & Couleur */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground font-light">
            <span>Taille : <strong>{item.selectedSize}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="sm:ml-0">Couleur : <strong>{item.selectedColor}</strong></span>
          </div>

          {/* Quantité + Supprimer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Quantité */}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(
                    item.product.id,
                    item.selectedSize,
                    item.selectedColor,
                    item.quantity - 1
                  )
                }
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-8 text-center text-sm font-light">
                {item.quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(
                    item.product.id,
                    item.selectedSize,
                    item.selectedColor,
                    item.quantity + 1
                  )
                }
                disabled={item.quantity >= 10}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Supprimer */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 hover:bg-destructive text-destructive hover:text-white mx-auto sm:mx-0"
              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Supprimer</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  ))}
</div>

          {/* 🧾 Résumé de commande */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-sans font-medium mb-6">Résumé</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm font-light">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{totalPrice.toFixed(2)} TND</span>
                </div>

                <div className="flex justify-between text-sm font-light">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)} TND`}</span>
                </div>

                {totalPrice < 100 && (
                  <p className="text-xs text-muted-foreground font-light">
                    Ajoutez {(100 - totalPrice).toFixed(2)} TND pour la livraison gratuite
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-light">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-accent">
                    {finalTotal.toFixed(2)} TND
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full font-light tracking-wide mb-4"
                onClick={() => router.push("/checkout")}
              >
                Passer la commande
              </Button>

              <Link href="/collections">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-light tracking-wide bg-transparent"
                >
                  Continuer mes achats
                </Button>
              </Link>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm text-muted-foreground font-light">
                <div className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Livraison gratuite à partir de 100TND</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Retours gratuits sous 30 jours</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
