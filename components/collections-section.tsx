"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function CollectionsSection() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data.categories || [])
      } catch (error) {
        console.error("[v0] Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section id="collections" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">Chargement des collections...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="collections" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-hero text-balance mb-6">Nos Collections</h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto text-pretty">
            Chaque collection Maktoub est pensée pour exprimer votre personnalité unique à travers des pièces
            d'exception.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`/.jpg?height=400&width=600&query=${category.name} collection fashion`}
                    alt={category.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-foreground">{category.name}</h3>
                  <p className="text-muted-foreground font-light mb-4 text-pretty">{category.description}</p>
                  <Link href={`/collections/${category.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto font-light text-accent hover:text-accent/80">
                      Découvrir →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/collections/all">
            <Button size="lg" variant="outline" className="font-light tracking-wide px-8 py-3 bg-transparent">
              Voir Toutes les Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}