import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Maktoub - Mode Moderne & Streetwear de Luxe",
  description:
    "Découvrez Maktoub, la marque de vêtements qui allie modernité, luxe et streetwear. Collections exclusives et design contemporain.",
  generator: "v0.app",
  icons: {
    icon: "/Maktoub Logo Symbol - Color.png", // Remplace par le chemin de ton favicon (ex: /favicon.png ou /favicon.svg)
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
