"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface CollectionProductsProps {
  products: any[] // ✅ on reçoit la liste directement
}

export function CollectionProducts({ products }: CollectionProductsProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Aucun produit trouvé.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/products?id=${product.id}`}>
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
              <p className="text-sm text-muted-foreground font-light mb-4 line-clamp-2">
                {product.description}
              </p>
              <Button variant="ghost" className="p-0.5 h-auto font-light text-accent cursor-pointer">
                Voir le produit →
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
