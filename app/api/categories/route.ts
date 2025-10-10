import { query } from "@/lib/mysql-client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const sql = `
      SELECT id, name, slug, description
      FROM categories
      ORDER BY name ASC
    `

    const categories = await query(sql)

    return NextResponse.json({ success: true, categories })
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}
