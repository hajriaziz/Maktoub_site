import { query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { generateUUID } from "@/lib/mysql-client"

// PATCH /api/admin/products/[id] - Mettre à jour un produit
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const formData = await request.formData()
    const updates: string[] = []
    const values: any[] = []

    const name = formData.get("name") as string | null
    const slug = formData.get("slug") as string | null
    const description = formData.get("description") as string | null
    const longDescription = formData.get("longDescription") as string | null
    const price = formData.get("price") as string | null
    const categoryId = formData.get("categoryId") as string | null
    const stock = formData.get("stock") as string | null
    const sizes = formData.get("sizes") as string | null
    const colors = formData.get("colors") as string | null
    const featured = formData.get("featured") as string | null

    if (name !== null && name !== undefined) {
      updates.push("name = ?")
      values.push(name)
    }
    if (slug !== null && slug !== undefined) {
      updates.push("slug = ?")
      values.push(slug)
    }
    if (description !== null && description !== undefined) {
      updates.push("description = ?")
      values.push(description)
    }
    if (longDescription !== null && longDescription !== undefined) {
      updates.push("long_description = ?")
      values.push(longDescription)
    }
    if (price !== null && price !== undefined) {
      updates.push("price = ?")
      values.push(Number.parseFloat(price))
    }
    if (categoryId !== null && categoryId !== undefined) {
      updates.push("category_id = ?")
      values.push(categoryId)
    }
    if (stock !== null && stock !== undefined) {
      updates.push("stock = ?")
      values.push(stock)
    }
    if (sizes !== null && sizes !== undefined) {
      updates.push("sizes = ?")
      values.push(sizes)
    }
    if (colors !== null && colors !== undefined) {
      updates.push("colors = ?")
      values.push(colors)
    }
    if (featured !== null && featured !== undefined) {
      updates.push("featured = ?")
      values.push(featured === "true")
    }

    // Gérer les nouvelles images
    const imageFiles = formData.getAll("images") as File[]
    if (imageFiles.length > 0) {
      const uploadsDir = path.join(process.cwd(), "public/uploads")
      await fs.mkdir(uploadsDir, { recursive: true })
      const newImages: string[] = []
      for (const image of imageFiles) {
        const fileExtension = image.name.split(".").pop()
        const fileName = `${generateUUID()}.${fileExtension}`
        const filePath = path.join(uploadsDir, fileName)
        const arrayBuffer = await image.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(arrayBuffer))
        newImages.push(`/uploads/${fileName}`)
      }
      const existingImages = JSON.parse((await query("SELECT images FROM products WHERE id = ?", [id]))[0].images) || []
      updates.push("images = ?")
      values.push(JSON.stringify([...existingImages, ...newImages]))
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 })
    }

    values.push(id)
    const sql = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`

    await query(sql, values)

    return NextResponse.json({ success: true, message: "Product updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE /api/admin/products/[id] - Supprimer un produit
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await query("DELETE FROM products WHERE id = ?", [id])

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}