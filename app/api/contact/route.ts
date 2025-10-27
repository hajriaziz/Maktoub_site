import { query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"
import { generateUUID } from "@/lib/mysql-client"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get("type") as string // 'contact' ou 'subscribe'

    if (type === "contact") {
      const firstName = formData.get("firstName") as string
      const lastName = formData.get("lastName") as string
      const email = formData.get("email") as string
      const subject = formData.get("subject") as string
      const message = formData.get("message") as string

      if (!firstName || !lastName || !email || !subject || !message) {
        return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
      }

      const id = generateUUID()
      const sql = `
        INSERT INTO contact_messages (id, first_name, last_name, email, subject, message)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      await query(sql, [id, firstName, lastName, email, subject, message])

      return NextResponse.json({ success: true, message: "Message sent successfully" })
    } else if (type === "subscribe") {
      const email = formData.get("email") as string

      if (!email) {
        return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
      }

      const id = generateUUID()
      const sql = `
        INSERT INTO subscriptions (id, email)
        VALUES (?, ?)
      `
      try {
        await query(sql, [id, email])
        return NextResponse.json({ success: true, message: "Subscription successful" })
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          return NextResponse.json({ success: true, message: "Tu es déjà abonné(e) avec nous !" })
        }
        throw error // Relancer l'erreur pour les autres cas
      }
    } else {
      return NextResponse.json({ success: false, error: "Invalid request type" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Error processing contact/subscription:", error)
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 })
  }
}