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
          <Link href="/collections/all">
            <Button size="lg" className="font-light tracking-wide">
              Découvrir la boutique
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const shippingCost = totalPrice >= 100 ? 0 : 9.99
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
                className="p-6"
              >
                <div className="flex gap-6">
                  {/* 🖼️ Image produit */}
                  <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                    <img
                      src={item.product.images?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* 📄 Infos produit */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="text-lg font-light hover:text-accent transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.product.category && (
                          <p className="text-sm text-muted-foreground font-light">
                            {item.product.category}
                          </p>
                        )}
                      </div>
                      <p className="text-lg font-light text-accent">
                        {Number(item.product.price).toFixed(2)} €
                      </p>
                    </div>

                    <div className="flex gap-4 mb-4 text-sm text-muted-foreground font-light">
                      <span>Taille : {item.selectedSize}</span>
                      <span>•</span>
                      <span>Couleur : {item.selectedColor}</span>
                    </div>

                    {/* 🔢 Quantité */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
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

                        <span className="text-sm font-light w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
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

                      {/* 🗑️ Supprimer */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-destructive text-destructive hover:text-white"
                        onClick={() =>
                          removeItem(item.product.id, item.selectedSize, item.selectedColor)
                        }
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
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
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between text-sm font-light">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)} €`}</span>
                </div>

                {totalPrice < 100 && (
                  <p className="text-xs text-muted-foreground font-light">
                    Ajoutez {(100 - totalPrice).toFixed(2)} € pour la livraison gratuite
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-light">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-accent">
                    {finalTotal.toFixed(2)} €
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

              <Link href="/collections/all">
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
                  <span>Livraison gratuite à partir de 100€</span>
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
