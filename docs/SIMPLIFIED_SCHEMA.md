# Schéma de Base de Données Simplifié - Maktoub

## Vue d'ensemble

Ce schéma simplifié réduit le nombre de tables de 12 à 6 et élimine les jointures complexes en stockant les données en JSON.

## Avantages

- **Moins de tables** : 6 au lieu de 12
- **Pas de jointures complexes** : Toutes les infos produit dans une seule table
- **Plus simple à gérer** : Moins de relations à maintenir
- **Plus rapide** : Moins de JOIN dans les requêtes
- **Flexible** : Facile d'ajouter de nouvelles propriétés en JSON

## Structure

### 1. categories (2 catégories seulement)
- Homme
- Femme

### 2. products (tout en un)
\`\`\`json
{
  "id": "prod-hoodie-noir-h",
  "name": "Hoodie Noir Essentiel",
  "slug": "hoodie-noir-homme",
  "price": 89.99,
  "category_id": "cat-homme",
  "images": ["/image1.jpg", "/image2.jpg"],
  "sizes": ["S", "M", "L", "XL"],
  "colors": [
    {"name": "Noir", "hex": "#000000"},
    {"name": "Gris", "hex": "#808080"}
  ],
  "stock": {
    "S": 10,
    "M": 15,
    "L": 20,
    "XL": 12
  }
}
\`\`\`

### 3. customers
- Informations client de base

### 4. addresses
- Adresses de livraison

### 5. orders
- Commandes avec statut

### 6. order_items
- Articles commandés (taille et couleur en texte simple)

## Requêtes Simplifiées

### Récupérer un produit
\`\`\`sql
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.slug = 'hoodie-noir-homme';
\`\`\`

### Récupérer les produits d'une catégorie
\`\`\`sql
SELECT 
  p.*,
  c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE c.slug = 'homme'
ORDER BY p.featured DESC, p.created_at DESC;
\`\`\`

### Vérifier le stock d'une taille
\`\`\`javascript
// En JavaScript après récupération
const product = await getProduct('hoodie-noir-homme')
const stockM = product.stock['M'] // 15
\`\`\`

## Migration depuis l'ancien schéma

Si vous avez déjà des données avec l'ancien schéma complexe, vous pouvez les migrer :

\`\`\`sql
-- Exemple de migration (à adapter selon vos données)
INSERT INTO products (name, slug, price, category_id, images, sizes, colors, stock)
SELECT 
  p.name,
  p.slug,
  p.price,
  p.category_id,
  JSON_ARRAYAGG(pi.image_url) as images,
  JSON_ARRAYAGG(DISTINCT s.code) as sizes,
  JSON_ARRAYAGG(DISTINCT JSON_OBJECT('name', c.name, 'hex', c.hex_code)) as colors,
  -- Stock à construire manuellement
FROM old_products p
-- ... jointures
GROUP BY p.id;
\`\`\`

## Installation

\`\`\`bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base
CREATE DATABASE maktoub_db;
USE maktoub_db;

# Exécuter les scripts
source scripts/simplified/01-create-tables-simple.sql;
source scripts/simplified/02-insert-data-simple.sql;
