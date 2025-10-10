-- Script d'insertion des produits pour MySQL
-- Base de données: maktoub_db

-- Variables pour stocker les IDs (MySQL ne supporte pas les variables comme PostgreSQL)
-- On va utiliser des sous-requêtes pour récupérer les IDs

-- =====================================================
-- Produit 1: Hoodie Noir Essentiel
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'essentials' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Hoodie Noir Essentiel',
  'hoodie-noir',
  'Hoodie premium en coton biologique',
  'Notre hoodie signature combine confort et style. Fabriqué en coton biologique de haute qualité, il offre une coupe moderne et décontractée. Parfait pour un look streetwear élégant.',
  89.99,
  @category_id,
  TRUE
);

-- Images du produit
INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/black-hoodie-front.png', 1),
(UUID(), @product_id, '/black-hoodie-back-view.png', 2);

-- Tailles disponibles
INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL', 'XXL');

-- Couleurs disponibles
INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Gris');

-- Stock
INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 50 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL', 'XXL');

-- =====================================================
-- Produit 2: T-Shirt Blanc Minimaliste
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'essentials' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'T-Shirt Blanc Minimaliste',
  't-shirt-blanc',
  'T-shirt essentiel en coton premium',
  'Un basique revisité avec une coupe parfaite. Ce t-shirt en coton premium offre un confort exceptionnel et une durabilité remarquable. Design minimaliste pour un style intemporel.',
  45.00,
  @category_id,
  TRUE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/white-t-shirt-minimalist.jpg', 1),
(UUID(), @product_id, '/white-t-shirt-detail.jpg', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('XS', 'S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Blanc', 'Noir', 'Gris');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 100 FROM sizes WHERE code IN ('XS', 'S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 3: Pantalon Cargo Noir
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'essentials' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Pantalon Cargo Noir',
  'cargo-noir',
  'Pantalon cargo fonctionnel et stylé',
  'Inspiré du streetwear urbain, ce cargo offre de multiples poches pratiques sans compromettre le style. Coupe ajustée moderne avec détails techniques.',
  95.00,
  @category_id,
  FALSE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/cargo-pants-black-urban.jpg', 1),
(UUID(), @product_id, '/cargo-pants-detail-pockets.jpg', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Kaki');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 30 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 4: Bomber Jacket Premium
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'premium' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Bomber Jacket Premium',
  'bomber-premium',
  'Veste bomber luxueuse en cuir vegan',
  'Notre bomber jacket premium allie luxe et conscience écologique. Fabriqué en cuir vegan de haute qualité avec doublure en satin. Finitions impeccables et détails dorés.',
  249.99,
  @category_id,
  TRUE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/luxury-bomber-jacket-black.jpg', 1),
(UUID(), @product_id, '/bomber-jacket-detail.jpg', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Bordeaux');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 20 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 5: Sweatshirt Urban
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'urban' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Sweatshirt Urban',
  'sweatshirt-urban',
  'Sweatshirt streetwear avec logo brodé',
  'Design urbain contemporain avec logo Maktoub brodé. Coton molletonné épais pour un confort optimal. Coupe oversize tendance.',
  79.99,
  @category_id,
  TRUE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 1),
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL', 'XXL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Gris', 'Noir', 'Beige');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 40 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL', 'XXL');

-- =====================================================
-- Produit 6: Jean Slim Noir
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'urban' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Jean Slim Noir',
  'jean-slim-noir',
  'Jean slim stretch confortable',
  'Jean noir profond avec coupe slim moderne. Tissu stretch pour un confort optimal. Détails usés subtils pour un look authentique.',
  89.00,
  @category_id,
  FALSE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 1),
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Bleu Marine');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 35 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 7: Chemise Premium Blanche
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'premium' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Chemise Premium Blanche',
  'chemise-premium',
  'Chemise en coton égyptien',
  'Élégance intemporelle avec cette chemise en coton égyptien. Coupe ajustée, col italien et boutons nacre. Parfaite pour les occasions formelles.',
  129.00,
  @category_id,
  FALSE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 1),
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Blanc', 'Bleu Marine');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 25 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 8: Veste Teddy Urban
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'urban' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Veste Teddy Urban',
  'teddy-urban',
  'Veste teddy bicolore streetwear',
  'Veste teddy classique revisitée avec des détails modernes. Laine et cuir vegan, doublure matelassée. Style college américain.',
  159.00,
  @category_id,
  TRUE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 1),
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Gris');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 15 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Produit 9: Pantalon Costume Premium
-- =====================================================
SET @product_id = UUID();
SET @category_id = (SELECT id FROM categories WHERE slug = 'premium' LIMIT 1);

INSERT INTO products (id, name, slug, description, long_description, price, category_id, featured)
VALUES (
  @product_id,
  'Pantalon Costume Premium',
  'pantalon-costume',
  'Pantalon de costume en laine italienne',
  'Pantalon de costume confectionné en laine italienne. Coupe droite élégante, plis marqués. Finitions main pour un rendu impeccable.',
  149.00,
  @category_id,
  FALSE
);

INSERT INTO product_images (id, product_id, image_url, display_order) VALUES
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 1),
(UUID(), @product_id, '/placeholder.svg?height=600&width=400', 2);

INSERT INTO product_sizes (product_id, size_id)
SELECT @product_id, id FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

INSERT INTO product_colors (product_id, color_id)
SELECT @product_id, id FROM colors WHERE name IN ('Noir', 'Gris', 'Bleu Marine');

INSERT INTO inventory (id, product_id, size_id, quantity)
SELECT UUID(), @product_id, id, 20 FROM sizes WHERE code IN ('S', 'M', 'L', 'XL');

-- =====================================================
-- Vérification des données insérées
-- =====================================================
SELECT 'Résumé des données insérées:' as Info;

SELECT 
  'Products' as Table_Name, 
  COUNT(*) as Count 
FROM products
UNION ALL
SELECT 'Product Images', COUNT(*) FROM product_images
UNION ALL
SELECT 'Product Sizes', COUNT(*) FROM product_sizes
UNION ALL
SELECT 'Product Colors', COUNT(*) FROM product_colors
UNION ALL
SELECT 'Inventory', COUNT(*) FROM inventory;

-- Afficher les produits par catégorie
SELECT 
  c.name as Category,
  COUNT(p.id) as Product_Count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name;

-- Afficher le stock total par produit
SELECT 
  p.name as Product,
  SUM(i.quantity) as Total_Stock
FROM products p
LEFT JOIN inventory i ON p.id = i.product_id
GROUP BY p.name
ORDER BY p.name;
