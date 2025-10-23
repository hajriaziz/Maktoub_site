"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingBag, Heart, Share2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog" // Assure-toi d'avoir ce composant

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    longDescription: string
    price: number
    categoryId: string
    images: string[]
    sizes: string[]
    colors: { name: string; hex: string }[]
    stock: Record<string, number>
    featured: boolean
    inStock: boolean
    category: string
    categorySlug: string
    createdAt: string
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "")
  const [quantity, setQuantity] = useState(1)
  const [showCartPopup, setShowCartPopup] = useState(false) // Nouvel état pour le popup
  const { addItem } = useCart()
  const router = useRouter()

  // Vérifier si la taille est en stock
  const isSizeInStock = (size: string) => {
    return product.stock[size] !== undefined && product.stock[size] > 0
  }

  // Vérifier si la quantité demandée est disponible
  const isQuantityAvailable = () => {
    return selectedSize && product.stock[selectedSize] >= quantity
  }

  // Vérifier si le produit a au moins une taille en stock
  const hasAnySizeInStock = () => {
    return Object.values(product.stock).some((qty) => qty > 0)
  }

  const handleSizeSelect = (size: string) => {
    if (isSizeInStock(size)) {
      setSelectedSize(size)
    } else {
      alert(`La taille ${size} n'est pas disponible en stock.`)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille")
      return
    }

    if (!isQuantityAvailable()) {
      alert(`Quantité insuffisante en stock pour la taille ${selectedSize}. Stock disponible: ${product.stock[selectedSize]}`)
      return
    }

    addItem({
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        images: product.images,
        category: product.category,
        sizes: product.sizes,
        colors: product.colors,
        inStock: hasAnySizeInStock(),
        featured: product.featured,
      },
      quantity,
      selectedSize,
      selectedColor,
    })

    // Afficher le popup au lieu de confirm
    setShowCartPopup(true)
  }

  const handleViewCart = () => {
    setShowCartPopup(false)
    router.push("/cart")
  }

  const handleContinueShopping = () => {
    setShowCartPopup(false)
    router.push("/collections/all")
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/30">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!hasAnySizeInStock() && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-chart-1 absolute top-4 left-4">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              {product.category && (
                <Badge variant="outline" className="bg-chart-2 text-white mb-3">
                  {product.category}
                </Badge>
              )}
              <h1 className="text-4xl font-sans font-normal mb-2">{product.name}</h1>
              <p className="text-3xl font-light text-accent">{product.price.toFixed(2)} €</p>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-light mb-2">Description</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-light mb-3">Couleur: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color: { name: string; hex: string }) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-light mb-3">Taille</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    disabled={!isSizeInStock(size)}
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14
                      rounded-md border 
                      flex items-center justify-center 
                      text-sm sm:text-base font-light transition-all
                      ${selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"}
                      ${!isSizeInStock(size)
                        ? "bg-ring/40 text-white cursor-not-allowed"
                        : ""}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-light mb-3">Quantité</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || !isQuantityAvailable()}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-light w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(quantity + 1, product.stock[selectedSize] || 0))}
                  disabled={!isQuantityAvailable()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {selectedSize && (
                  <p className="text-sm text-muted-foreground">
                    Stock disponible: {product.stock[selectedSize] || 0}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full font-light tracking-wide"
                onClick={handleAddToCart}
                disabled={!selectedSize || !isQuantityAvailable()}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isQuantityAvailable() ? "Ajouter au panier" : "Stock insuffisant"}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="font-light bg-transparent">
                  <Heart className="mr-2 h-5 w-5" />
                  Favoris
                </Button>
                <Button variant="outline" size="lg" className="font-light bg-transparent">
                  <Share2 className="mr-2 h-5 w-5" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <Card className="p-6 bg-secondary/30">
              <h3 className="text-lg font-light mb-4">Détails du produit</h3>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                {product.category && <li>• Catégorie: {product.category}</li>}
                <li>• Livraison gratuite à partir de 100€</li>
                <li>• Retours gratuits sous 30 jours</li>
                <li>• Paiement sécurisé</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Popup Modale */}
        <Dialog open={showCartPopup} onOpenChange={setShowCartPopup} modal={true} >
          <DialogContent className="sm:max-w-[425px]">
<DialogHeader className="text-center">
      <div className="mx-auto w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-2">
        <svg
          className="w-6 h-6 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <DialogTitle className="text-2xl font-light text-foreground">Succès !</DialogTitle>
    </DialogHeader>
            <div className="py-1">
              <p className="text-center text-accent font-light">
                {product.name} a été ajouté au panier !
              </p>
            </div>
            <DialogFooter>
              <Button
                onClick={handleViewCart}
                className="w-full sm:w-auto font-light bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Voir le panier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}