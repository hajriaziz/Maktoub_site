"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CollectionProductsProps {
  collectionSlug: string
}

export function CollectionProducts({ collectionSlug }: CollectionProductsProps) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [collectionName, setCollectionName] = useState("")

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)

        // Fetch products based on collection slug
        let url = "/api/products"
        if (collectionSlug !== "all") {
          url += `?category=${collectionSlug}`
        }

        const res = await fetch(url)
        const data = await res.json()

        console.log("[v0] API Response:", data) // Ajout pour débogage

        setProducts(data.products || [])

        // Set collection name based on API response
        if (collectionSlug === "all") {
          setCollectionName("Toutes les Collections")
        } else if (data.products.length > 0) {
          // Vérifie différentes structures possibles de la réponse
          if (data.products[0].category && typeof data.products[0].category === "object" && data.products[0].category.name) {
            setCollectionName(data.products[0].category.name)
          } else if (data.products[0].category) {
            setCollectionName(data.products[0].category.toString()) // Fallback si category est un ID ou une chaîne
          } else {
            setCollectionName(collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1)) // Fallback avec slug formaté
          }
        } else {
          setCollectionName("Collection Non Trouvée") // Fallback si pas de produits
        }
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        setCollectionName("Erreur de Chargement")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [collectionSlug])

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">Chargement des produits...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light font-bold text-ring mb-4"> {collectionName}</h1>
          <p className="text-lg text-muted-foreground font-light">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-chart-1 text-accent-foreground">Nouveauté</Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="text-accent-foreground bg-accent absolute top-4 left-4">
                      Rupture de stock
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-light text-foreground group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-light text-accent">{product.price.toFixed(2)} TND</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-light mb-4 line-clamp-2">{product.description}</p>
                  <Button variant="ghost" className="p-0.5 h-auto font-light text-accent cursor-pointer">
                    Voir le produit →
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}