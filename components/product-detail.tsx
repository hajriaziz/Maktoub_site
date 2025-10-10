"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, ShoppingBag, Heart, Share2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

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

    // Show success message and redirect to cart
    const goToCart = confirm(`${product.name} ajouté au panier!\n\nVoulez-vous voir votre panier?`)
    if (goToCart) {
      router.push("/cart")
    }
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
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg px-6 py-2">
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
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
              )}
              <h1 className="text-4xl font-serif font-bold mb-2">{product.name}</h1>
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
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`py-3 rounded-lg border-2 transition-all font-light ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    } ${!isSizeInStock(size) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}`} // Rendu gris pour hors stock
                    disabled={!isSizeInStock(size)}
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
      </div>
    </div>
  )
}