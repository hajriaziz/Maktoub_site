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
  const [showEditForm, setShowEditForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const router = useRouter()

  // Form state for creation
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

  // Form state for editing
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: "",
    categoryId: "",
    images: [] as File[],
    sizes: [] as string[],
    stock: {} as Record<string, number>,
    colors: [] as { name: string; hex: string }[],
    featured: false,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/admin/products.php`)
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/categories/get_all.php`)
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

    const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("slug", formData.slug);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("longDescription", formData.longDescription);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("categoryId", formData.categoryId);
  formDataToSend.append("sizes", JSON.stringify(formData.sizes)); // ✅ important
  formDataToSend.append("stock", JSON.stringify(formData.stock));
  formDataToSend.append("colors", JSON.stringify(formData.colors));
  formDataToSend.append("featured", formData.featured.toString());

  formData.images.forEach((image) => {
    formDataToSend.append("images[]", image) // images[]
  })

    try { 
       const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/admin/products.php`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/admin/product_update.php?id=${id}`, {
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

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setEditFormData({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price.toString(),
      categoryId: product.categoryId,
      images: [],
      sizes: product.sizes,
      stock: { ...product.stock },
      colors: [...product.colors],
      featured: product.featured,
    })
    setShowEditForm(true)
  }

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault()

  // Synchroniser stock avec tailles
  const updatedStock = { ...editFormData.stock }
  editFormData.sizes.forEach((size) => {
    if (!updatedStock[size]) updatedStock[size] = 0
  })
  Object.keys(updatedStock).forEach((size) => {
    if (!editFormData.sizes.includes(size)) delete updatedStock[size]
  })

  const formDataToSend = new FormData()
  formDataToSend.append("name", editFormData.name)
  formDataToSend.append("slug", editFormData.slug)
  formDataToSend.append("description", editFormData.description)
  formDataToSend.append("longDescription", editFormData.longDescription)
  formDataToSend.append("price", editFormData.price)
  formDataToSend.append("categoryId", editFormData.categoryId)
  formDataToSend.append("sizes", JSON.stringify(editFormData.sizes))
  formDataToSend.append("stock", JSON.stringify(updatedStock))
  formDataToSend.append("colors", JSON.stringify(editFormData.colors))
  formDataToSend.append("featured", editFormData.featured.toString())

  // CORRIGÉ : images[]
  editFormData.images.forEach((image) => {
    formDataToSend.append("images[]", image) // images[]
  })

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(
      `${apiUrl}/admin/product_update.php?id=${editFormData.id}`,
      {
        method: "POST",
        body: formDataToSend,
      }
    )

    const data = await response.json()

    if (data.success) {
      alert("Produit mis à jour avec succès!")
      setShowEditForm(false)
      setEditProduct(null)
      fetchProducts()
      router.refresh()
    } else {
      alert(`Erreur: ${data.error}`)
    }
  } catch (error) {
    console.error("Error updating product:", error)
    alert("Erreur lors de la mise à jour")
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
    stock: { S: 0, M: 0, L: 0, XL: 0 } as Record<string, number>, // CORRIGÉ
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

  const updateEditStock = (size: string, quantity: string) => {
    setEditFormData((prev) => ({
      ...prev,
      stock: { ...prev.stock, [size]: Number(quantity) || 0 },
    }))
  }

  const addEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setEditFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeEditImage = (index: number) => {
    setEditFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addEditColor = () => {
    setEditFormData({
      ...editFormData,
      colors: [...editFormData.colors, { name: "", hex: "#000000" }],
    })
  }

  const updateEditColor = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...editFormData.colors]
    newColors[index][field] = value
    setEditFormData({ ...editFormData, colors: newColors })
  }

  const removeEditColor = (index: number) => {
    const newColors = editFormData.colors.filter((_, i) => i !== index)
    setEditFormData({ ...editFormData, colors: newColors })
  }

  if (loading) {
    return (
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-sans font-normal ">Gestion des Produits</h1>
          <div className="space-x-4">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? "Annuler" : "Ajouter un Produit"}
            </Button>
            <Link href="/admin/dashboard">
              <Button variant="outline" size="lg" className="font-medium">
                <Edit className="h-5 w-5 mr-2" />
                Retour au Dashboard
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
                    <Label htmlFor="price">Prix (TND) *</Label>
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
        onChange={(e) => {
          const newSizes = [...formData.sizes]
          newSizes[index] = e.target.value
          setFormData({ ...formData, sizes: newSizes })
        }}
        placeholder="Taille (ex: S)"
      />
      <Input
        type="number"
        value={formData.stock[size] ?? 0}
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

        {showEditForm && editProduct && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Modifier le Produit: {editProduct.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Nom du produit *</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-slug">Slug (URL) *</Label>
                    <Input
                      id="edit-slug"
                      value={editFormData.slug}
                      onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                      placeholder="hoodie-noir-homme"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-price">Prix (TND) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-category">Catégorie *</Label>
                    <Select
                      value={editFormData.categoryId}
                      onValueChange={(value) => setEditFormData({ ...editFormData, categoryId: value })}
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
                  <Label htmlFor="edit-description">Description courte</Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-longDescription">Description détaillée</Label>
                  <Textarea
                    id="edit-longDescription"
                    value={editFormData.longDescription}
                    onChange={(e) => setEditFormData({ ...editFormData, longDescription: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="block mb-2">Images du Produit</Label>
                  <div className="flex items-center gap-4 mb-4">
                    <label
                      htmlFor="edit-image-upload"
                      className="flex items-center justify-center w-40 h-12 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Ajouter des Images
                    </label>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={addEditImage}
                      className="hidden"
                    />
                  </div>
                  {editFormData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {editFormData.images.map((image, index) => (
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
                            onClick={() => removeEditImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {editProduct.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {editProduct.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          <img
                            src={image}
                            alt={`Image existante ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Tailles disponibles et Stock</Label>
                  {editFormData.sizes.map((size, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={size}
                        onChange={(e) =>
                          setEditFormData((prev) => {
                            const newSizes = [...prev.sizes]
                            newSizes[index] = e.target.value
                            return { ...prev, sizes: newSizes }
                          })
                        }
                        placeholder="Taille (ex: S)"
                      />
                      <Input
                        type="number"
                        value={editFormData.stock[size] || ""}
                        onChange={(e) => updateEditStock(size, e.target.value)}
                        placeholder="Quantité"
                        min="0"
                      />
                      {editFormData.sizes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditFormData((prev) => ({
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
                      setEditFormData((prev) => ({
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
                  {editFormData.colors.map((color, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={color.name}
                        onChange={(e) => updateEditColor(index, "name", e.target.value)}
                        placeholder="Nom de la couleur"
                      />
                      <Input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateEditColor(index, "hex", e.target.value)}
                        className="w-20"
                      />
                      {editFormData.colors.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeEditColor(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addEditColor}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une couleur
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editFormData.featured}
                    onChange={(e) => setEditFormData({ ...editFormData, featured: e.target.checked })}
                  />
                  <Label htmlFor="edit-featured">Produit mis en avant</Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Mettre à jour le Produit
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
                <p className="font-bold mb-2">{product.price.toFixed(2)} TND</p>
              <p className="text-sm mb-2">
                Tailles: {Array.isArray(product.sizes) ? product.sizes.join(", ") : "—"}
              </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(product)}
                  >
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