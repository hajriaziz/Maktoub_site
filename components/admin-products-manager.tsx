"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Edit, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  price: number
  categoryId: string
  categoryName: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  stock: Record<string, number>
  featured: boolean
}

export default function AdminProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: "",
    categoryId: "",
    images: [] as File[],
    sizes: ["S", "M", "L", "XL"],
    stock: {} as Record<string, number>,
    colors: [{ name: "Noir", hex: "#000000" }],
    featured: false,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products")
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("slug", formData.slug)
    formDataToSend.append("description", formData.description)
    formDataToSend.append("longDescription", formData.longDescription)
    formDataToSend.append("price", formData.price)
    formDataToSend.append("categoryId", formData.categoryId)
    formDataToSend.append("stock", JSON.stringify(formData.stock))
    formDataToSend.append("colors", JSON.stringify(formData.colors))
    formDataToSend.append("featured", formData.featured.toString())

    formData.images.forEach((image) => {
      formDataToSend.append("images", image)
    })

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (data.success) {
        alert("Produit créé avec succès!")
        setShowForm(false)
        fetchProducts()
        resetForm()
        router.refresh()
      } else {
        alert(`Erreur: ${data.error}`)
      }
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Erreur lors de la création du produit")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) return

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        alert("Produit supprimé avec succès!")
        fetchProducts()
      } else {
        alert(`Erreur: ${data.error}`)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      price: "",
      categoryId: "",
      images: [],
      sizes: ["S", "M", "L", "XL"],
      stock: {},
      colors: [{ name: "Noir", hex: "#000000" }],
      featured: false,
    })
  }

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { name: "", hex: "#000000" }],
    })
  }

  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...formData.colors]
    newColors[index][field] = value
    setFormData({ ...formData, colors: newColors })
  }

  const removeColor = (index: number) => {
    const newColors = formData.colors.filter((_, i) => i !== index)
    setFormData({ ...formData, colors: newColors })
  }

  const updateStock = (size: string, quantity: string) => {
    setFormData((prev) => ({
      ...prev,
      stock: { ...prev.stock, [size]: Number(quantity) || 0 },
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold">Gestion des Produits</h1>
          <div className="space-x-4">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? "Annuler" : "Ajouter un Produit"}
            </Button>
            <Link href="/admin/">
              <Button variant="outline" size="lg" className="font-medium">
                <Edit className="h-5 w-5 mr-2" />
                Retour au Tableau de Bord
              </Button>
            </Link>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nouveau Produit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug (URL) *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="hoodie-noir-homme"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description courte</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Description détaillée</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="block mb-2">Images du Produit</Label>
                  <div className="flex items-center gap-4 mb-4">
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-40 h-12 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Ajouter des Images
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={addImage}
                      className="hidden"
                    />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Aperçu ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Tailles disponibles et Stock</Label>
                  {formData.sizes.map((size, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={size}
                        onChange={(e) =>
                          setFormData((prev) => {
                            const newSizes = [...prev.sizes]
                            newSizes[index] = e.target.value
                            return { ...prev, sizes: newSizes }
                          })
                        }
                        placeholder="Taille (ex: S)"
                      />
                      <Input
                        type="number"
                        value={formData.stock[size] || ""}
                        onChange={(e) => updateStock(size, e.target.value)}
                        placeholder="Quantité"
                        min="0"
                      />
                      {formData.sizes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              sizes: prev.sizes.filter((_, i) => i !== index),
                              stock: Object.fromEntries(
                                Object.entries(prev.stock).filter(([s]) => s !== size)
                              ),
                            }))
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        sizes: [...prev.sizes, ""],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une taille
                  </Button>
                </div>

                <div>
                  <Label>Couleurs</Label>
                  {formData.colors.map((color, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={color.name}
                        onChange={(e) => updateColor(index, "name", e.target.value)}
                        placeholder="Nom de la couleur"
                      />
                      <Input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(index, "hex", e.target.value)}
                        className="w-20"
                      />
                      {formData.colors.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeColor(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addColor}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une couleur
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Produit mis en avant</Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Créer le Produit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4 bg-muted rounded-lg overflow-hidden">
                  {product.images[0] && (
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.categoryName}</p>
                <p className="font-bold mb-2">{product.price.toFixed(2)} €</p>
                <p className="text-sm mb-2">Tailles: {product.sizes.join(", ")}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}