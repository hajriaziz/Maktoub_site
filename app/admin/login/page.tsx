"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsRedirecting(false)

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    console.log("Login response:", data)

    if (data.success) {
      if (data.token) {
        localStorage.setItem("token", data.token)
        console.log("Token stored:", localStorage.getItem("token"))
        setIsRedirecting(true) // Déclenche la redirection
      } else {
        console.error("No token in response:", data)
        setError("No token received")
      }
    } else {
      setError(data.error || "Login failed")
    }
  }
  
// Utilise useEffect pour gérer la redirection
  useEffect(() => {
    if (isRedirecting) {
      router.push("/admin/dashboard")
    }
  }, [isRedirecting, router]) // Dépendances : isRedirecting et router

return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Maktoub Logo Horizontal - Color.png" // Chemin de l'image fourni
          alt="Maktoub Fashion"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <Card className="w-full max-w-md p-6 space-y-2 relative z-10 border-accent">
        {/* Logo centré en haut */}
        <div className="flex justify-center mb-1">
          <img
            src="/Maktoub Logo Symbol - Color.png" // Remplace par le chemin de ton logo
            alt="Logo Maktoub"
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-4xl font-sans font-normal text-center text-black">Connexion Admin</h1>
        {error && <p className="text-red-200 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/90"
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-accent">
            Se connecter
          </Button>
        </form>
      </Card>
    </div>
  )
}