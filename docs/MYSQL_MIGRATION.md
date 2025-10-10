# Migration de Supabase vers MySQL

Ce guide explique comment migrer le projet Maktoub de Supabase vers MySQL local.

## Fichiers Modifiés

### 1. Clients de Base de Données

**Anciens fichiers (Supabase):**
- `lib/supabase-client.ts` - Client Supabase pour le navigateur
- `lib/supabase-server.ts` - Client Supabase pour le serveur

**Nouveaux fichiers (MySQL):**
- `lib/mysql-client.ts` - Client MySQL avec pool de connexions
- `lib/mysql-server.ts` - Utilitaires et QueryBuilder pour MySQL

### 2. API Routes Modifiées

Tous les fichiers dans `app/api/` ont été convertis pour utiliser MySQL:

- `app/api/products/route.ts` - Liste des produits
- `app/api/products/[slug]/route.ts` - Détail d'un produit
- `app/api/categories/route.ts` - Liste des catégories
- `app/api/orders/route.ts` - Création et récupération des commandes
- `app/api/orders/[id]/route.ts` - Détail et mise à jour d'une commande
- `app/api/stock/route.ts` - Gestion du stock

## Principales Différences

### Supabase vs MySQL

| Aspect | Supabase | MySQL |
|--------|----------|-------|
| **Requêtes** | API JavaScript chainable | SQL brut avec paramètres |
| **Jointures** | `.select('table(columns)')` | `JOIN` SQL standard |
| **Transactions** | Pas de support natif | `BEGIN/COMMIT/ROLLBACK` |
| **UUID** | Généré automatiquement | Généré avec `crypto.randomUUID()` |
| **Agrégation** | `json_agg()` PostgreSQL | `GROUP_CONCAT()` MySQL |

### Exemple de Conversion

**Avant (Supabase):**
\`\`\`typescript
const { data, error } = await supabase
  .from("products")
  .select(`
    *,
    category:categories(name, slug),
    images:product_images(image_url)
  `)
  .eq("slug", slug)
  .single()
\`\`\`

**Après (MySQL):**
\`\`\`typescript
const sql = `
  SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    GROUP_CONCAT(pi.image_url SEPARATOR '|||') as images
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  LEFT JOIN product_images pi ON p.id = pi.product_id
  WHERE p.slug = ?
  GROUP BY p.id, c.name, c.slug
`

const row = await queryOne(sql, [slug])
\`\`\`

## Installation et Configuration

### 1. Installer MySQL2

\`\`\`bash
npm install mysql2
\`\`\`

### 2. Configurer les Variables d'Environnement

Créer `.env.local`:

\`\`\`env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=votre_username
MYSQL_PASSWORD=votre_password
MYSQL_DATABASE=maktoub_db
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 3. Créer la Base de Données

\`\`\`bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base
CREATE DATABASE maktoub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE maktoub_db;

# Exécuter les scripts
source scripts/01-create-tables-mysql.sql;
source scripts/02-insert-initial-data-mysql.sql;
source scripts/03-insert-products-mysql.sql;
\`\`\`

### 4. Supprimer les Dépendances Supabase (Optionnel)

\`\`\`bash
npm uninstall @supabase/ssr @supabase/supabase-js
\`\`\`

## Fonctionnalités MySQL

### Pool de Connexions

Le client MySQL utilise un pool de connexions pour optimiser les performances:

\`\`\`typescript
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number.parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10, // Max 10 connexions simultanées
})
\`\`\`

### Transactions

Les transactions garantissent la cohérence des données:

\`\`\`typescript
const result = await transaction(async (connection) => {
  // Créer le client
  await connection.execute('INSERT INTO customers ...')
  
  // Créer la commande
  await connection.execute('INSERT INTO orders ...')
  
  // Mettre à jour le stock
  await connection.execute('UPDATE product_sizes ...')
  
  return { orderId, orderNumber }
})
\`\`\`

### QueryBuilder

Un QueryBuilder est disponible pour construire des requêtes complexes:

\`\`\`typescript
const products = await db.builder()
  .select(['p.*', 'c.name as category_name'])
  .from('products p')
  .leftJoin('categories c', 'p.category_id = c.id')
  .where('p.featured = ?', true)
  .orderBy('p.created_at', 'DESC')
  .limit(10)
  .execute()
\`\`\`

## Tests

Pour tester la connexion MySQL:

\`\`\`typescript
// Test simple
import { query } from '@/lib/mysql-client'

const result = await query('SELECT 1 + 1 as result')
console.log(result) // [{ result: 2 }]
\`\`\`

## Dépannage

### Erreur de Connexion

\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:3306
\`\`\`

**Solution:** Vérifier que MySQL est démarré:
\`\`\`bash
# macOS
brew services start mysql

# Linux
sudo service mysql start
\`\`\`

### Erreur d'Authentification

\`\`\`
Error: Access denied for user 'username'@'localhost'
\`\`\`

**Solution:** Vérifier les credentials dans `.env.local`

### Erreur de Charset

\`\`\`
Error: Incorrect string value
\`\`\`

**Solution:** Utiliser `utf8mb4`:
\`\`\`sql
ALTER DATABASE maktoub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

## Avantages de MySQL Local

1. **Contrôle Total** - Vous gérez votre propre base de données
2. **Pas de Limites** - Pas de quotas ou de limitations
3. **Performance** - Connexion locale ultra-rapide
4. **Coût** - Gratuit, pas d'abonnement
5. **Développement** - Facile à tester et déboguer

## Prochaines Étapes

- Ajouter des index pour optimiser les performances
- Implémenter un système de cache (Redis)
- Ajouter des tests unitaires pour les API
- Configurer les backups automatiques
