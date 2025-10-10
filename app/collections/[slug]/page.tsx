import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CollectionProducts } from "@/components/collection-products"

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.categories || []
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return []
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  const slugs = categories.map((cat: any) => cat.slug)
  slugs.push("all")
  return slugs.map((slug: string) => ({ slug }))
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CollectionProducts collectionSlug={params.slug} />
      <Footer />
    </main>
  )
}
