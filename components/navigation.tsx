"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
<Link href="/" className="flex-shrink-0 flex items-center gap-3">
  <div className="flex items-baseline gap-3">
    <h1 className="text-2xl font-sans font-medium text-accent/80 tracking-wide">
      MAKTOUB
    </h1>
    <span className="text-accent">|</span>
    <p className="text-2xl font-sans font-medium text-accent/80 tracking-normal">
      مكتوب
    </p>
  </div>
</Link>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/#collections"
                className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Collections
              </a>
              <a
                href="/#about"
                className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                À Propos
              </a>
              <a
                href="/#lookbook"
                className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Lookbook
              </a>
              <a
                href="/#contact"
                className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="text-foreground relative cursor-pointer">
                <ShoppingBag className="h-5 w-5  hover:text-white " />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-chart-2 ">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/collections/all">
              <Button variant="outline" size="sm" className="font-light tracking-wide bg-transparent cursor-pointer">
                Shop
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="text-foreground relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a
                href="/#collections"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Collections
              </a>
              <a
                href="/#about"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                À Propos
              </a>
              <a
                href="/#lookbook"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Lookbook
              </a>
              <a
                href="/#contact"
                className="block px-3 py-2 text-foreground hover:text-accent transition-colors duration-200 text-sm font-light tracking-wide"
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Link href="/collections/all">
                  <Button variant="outline" size="sm" className="w-full font-light tracking-wide bg-transparent">
                    Shop
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}