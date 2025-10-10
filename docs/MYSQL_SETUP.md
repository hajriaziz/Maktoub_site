# Configuration MySQL pour Maktoub

## Installation de MySQL

### macOS (avec Homebrew)
\`\`\`bash
brew install mysql
brew services start mysql
mysql_secure_installation
\`\`\`

### Ubuntu/Debian
\`\`\`bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
\`\`\`

### Windows
Télécharger depuis: https://dev.mysql.com/downloads/mysql/

## Création de la Base de Données

### 1. Se connecter à MySQL
\`\`\`bash
mysql -u root -p
\`\`\`

### 2. Créer la base de données
\`\`\`sql
CREATE DATABASE maktoub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

### 3. Créer un utilisateur (optionnel mais recommandé)
\`\`\`sql
CREATE USER 'maktoub_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON maktoub_db.* TO 'maktoub_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### 4. Utiliser la base de données
\`\`\`sql
USE maktoub_db;
\`\`\`

### 5. Exécuter les scripts SQL
\`\`\`sql
SOURCE /chemin/complet/vers/scripts/01-create-tables-mysql.sql;
SOURCE /chemin/complet/vers/scripts/02-insert-initial-data-mysql.sql;
SOURCE /chemin/complet/vers/scripts/03-insert-products-mysql.sql;
\`\`\`

Ou depuis le terminal:
\`\`\`bash
mysql -u maktoub_user -p maktoub_db < scripts/01-create-tables-mysql.sql
mysql -u maktoub_user -p maktoub_db < scripts/02-insert-initial-data-mysql.sql
mysql -u maktoub_user -p maktoub_db < scripts/03-insert-products-mysql.sql
\`\`\`

## Configuration du Projet

### 1. Créer le fichier .env.local
\`\`\`env
# MySQL Configuration
DATABASE_URL=mysql://maktoub_user:votre_mot_de_passe@localhost:3306/maktoub_db
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=maktoub_user
MYSQL_PASSWORD=votre_mot_de_passe
MYSQL_DATABASE=maktoub_db

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 2. Installer mysql2
\`\`\`bash
npm install mysql2
\`\`\`

### 3. Créer le client de base de données

Créer le fichier `lib/mysql-client.ts`:
\`\`\`typescript
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00'
})

export async function query(sql: string, params?: any[]) {
  const [rows] = await pool.execute(sql, params)
  return { rows }
}

export default pool
\`\`\`

## Vérification de l'Installation

### Vérifier les tables créées
\`\`\`sql
SHOW TABLES;
\`\`\`

Vous devriez voir:
- addresses
- categories
- colors
- customers
- inventory
- order_items
- orders
- product_colors
- product_images
- product_sizes
- products
- sizes

### Vérifier les données
\`\`\`sql
-- Nombre de produits
SELECT COUNT(*) FROM products;

-- Produits par catégorie
SELECT c.name, COUNT(p.id) as count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name;

-- Stock total
SELECT SUM(quantity) as total_stock FROM inventory;
\`\`\`

## Commandes Utiles

### Voir la structure d'une table
\`\`\`sql
DESCRIBE products;
\`\`\`

### Voir toutes les bases de données
\`\`\`sql
SHOW DATABASES;
\`\`\`

### Sauvegarder la base de données
\`\`\`bash
mysqldump -u maktoub_user -p maktoub_db > backup.sql
\`\`\`

### Restaurer la base de données
\`\`\`bash
mysql -u maktoub_user -p maktoub_db < backup.sql
\`\`\`

### Supprimer toutes les données (ATTENTION!)
\`\`\`sql
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE addresses;
TRUNCATE TABLE customers;
TRUNCATE TABLE inventory;
TRUNCATE TABLE product_colors;
TRUNCATE TABLE product_sizes;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE colors;
TRUNCATE TABLE sizes;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;
\`\`\`

## Dépannage

### Erreur de connexion
- Vérifier que MySQL est démarré: `sudo systemctl status mysql`
- Vérifier les credentials dans .env.local
- Vérifier que l'utilisateur a les permissions: `SHOW GRANTS FOR 'maktoub_user'@'localhost';`

### Erreur UUID()
Si vous avez une erreur avec UUID(), assurez-vous d'utiliser MySQL 8.0+:
\`\`\`sql
SELECT VERSION();
\`\`\`

### Erreur de charset
\`\`\`sql
ALTER DATABASE maktoub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
