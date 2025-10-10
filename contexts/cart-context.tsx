"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface CartItem {
  product: any
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  totalItems: number
  totalPrice: number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setItems(JSON.parse(saved))
  }, [])

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      )
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        return [...prev, item]
      }
    })
  }

  const removeItem = (id: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === id &&
            i.selectedSize === size &&
            i.selectedColor === color
          )
      )
    )
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === id &&
        i.selectedSize === size &&
        i.selectedColor === color
          ? { ...i, quantity: Math.max(1, quantity) }
          : i
      )
    )
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
