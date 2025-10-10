import { generateUUID, query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// POST /api/admin/products - Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const longDescription = formData.get("longDescription") as string
    const price = formData.get("price") as string
    const categoryId = formData.get("categoryId") as string
    const stock = JSON.parse(formData.get("stock") as string)
    const colors = JSON.parse(formData.get("colors") as string)
    const featured = formData.get("featured") === "true"

    // Validation
    if (!name || !slug || !price || !categoryId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Vérifier si le slug existe déjà
    const existingProduct = await query("SELECT id FROM products WHERE slug = ?", [slug])
    if (existingProduct.length > 0) {
      return NextResponse.json({ success: false, error: "Product slug already exists" }, { status: 400 })
    }

    const productId = generateUUID()

    // Gérer les images uploadées
    const images: string[] = []
    const uploadsDir = path.join(process.cwd(), "public/uploads")
    await fs.mkdir(uploadsDir, { recursive: true })

    const imageFiles = formData.getAll("images") as File[]
    for (const image of imageFiles) {
      const fileExtension = image.name.split(".").pop()
      const fileName = `${generateUUID()}.${fileExtension}`
      const filePath = path.join(uploadsDir, fileName)
      const arrayBuffer = await image.arrayBuffer()
      await fs.writeFile(filePath, Buffer.from(arrayBuffer))
      images.push(`/uploads/${fileName}`)
    }

    const sql = `
      INSERT INTO products (
        id, name, slug, description, long_description, price, category_id,
        images, sizes, colors, stock, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    await query(sql, [
      productId,
      name,
      slug,
      description || "",
      longDescription || "",
      Number.parseFloat(price),
      categoryId,
      JSON.stringify(images),
      JSON.stringify(Object.keys(stock)),
      JSON.stringify(colors),
      JSON.stringify(stock),
      featured,
    ])

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      productId,
    })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}

// GET /api/admin/products - Récupérer tous les produits (admin)
export async function GET() {
  try {
    const sql = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `

    const rows = await query<any>(sql)

    const products = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      longDescription: row.long_description,
      price: Number.parseFloat(row.price),
      categoryId: row.category_id,
      categoryName: row.category_name,
      categorySlug: row.category_slug,
      images: JSON.parse(row.images),
      sizes: JSON.parse(row.sizes),
      colors: JSON.parse(row.colors),
      stock: JSON.parse(row.stock),
      featured: Boolean(row.featured),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}