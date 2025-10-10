import { query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    let sql = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.long_description,
        p.price,
        p.category_id,
        p.images,
        p.sizes,
        p.colors,
        p.stock,
        p.featured,
        p.created_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `

    const params: any[] = []
    const conditions: string[] = []

    if (category) {
      conditions.push("c.slug = ?")
      params.push(category)
    }

    if (featured === "true") {
      conditions.push("p.featured = TRUE")
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ")
    }

    sql += " ORDER BY p.featured DESC, p.created_at DESC"

    const rows = await query<any>(sql, params)

    const products = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      longDescription: row.long_description,
      price: Number.parseFloat(row.price),
      categoryId: row.category_id,
      images: JSON.parse(row.images),
      sizes: JSON.parse(row.sizes),
      colors: JSON.parse(row.colors),
      stock: JSON.parse(row.stock),
      featured: Boolean(row.featured),
      inStock: Object.values(JSON.parse(row.stock)).some((qty: any) => qty > 0),
      category: row.category_name,
      categorySlug: row.category_slug,
      createdAt: row.created_at,
    }))

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
