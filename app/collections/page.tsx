"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CollectionProducts } from "@/components/collection-products"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function CollectionsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [collectionName, setCollectionName] = useState("Toutes les Collections")
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("id")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const endpoint = categoryId
          ? `${apiUrl}/products/get_by_category.php?category_id=${categoryId}`
          : `${apiUrl}/products/get_by_category.php`

        const res = await fetch(endpoint, { cache: "no-store" })
        if (!res.ok) throw new Error("HTTP " + res.status)

        const data = await res.json()
        if (!data.success) throw new Error(data.error || "API error")

        const fetchedProducts = Array.isArray(data.products) ? data.products : []
        setProducts(fetchedProducts)

        // Titre dynamique
        if (categoryId && fetchedProducts.length > 0) {
          setCollectionName(fetchedProducts[0].category || `Collection #${categoryId}`)
        } else {
          setCollectionName("Toutes les Collections")
        }
      } catch (error) {
        console.error("Erreur:", error)
        setCollectionName("Erreur de chargement")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Chargement...</p>
      </div>
    )
  }

return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-light font-bold text-ring text-centre mb-4">
          {collectionName}
        </h1>
        </div>
        <CollectionProducts products={products} />
      </section>
      <Footer />
    </main>
  )
}