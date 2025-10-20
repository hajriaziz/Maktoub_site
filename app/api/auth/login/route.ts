import { generateUUID, query } from "@/lib/mysql-client"
import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { config } from "dotenv"

config()

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log("Received login request:", { email, password })

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const [users] = await query("SELECT id, email, password, role FROM users WHERE email = ?", [email])
    console.log("Query result:", users)

    let user;
    if (Array.isArray(users)) {
      user = users[0];
    } else {
      user = users;
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    console.log("User object:", user)

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    )
    console.log("Generated token:", token)
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("[v0] Error during login:", error)
    return NextResponse.json({ success: false, error: "Failed to login" }, { status: 500 })
  }
}