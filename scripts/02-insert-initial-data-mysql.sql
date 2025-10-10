-- Script d'insertion des données initiales pour MySQL
-- Base de données: maktoub_db

-- =====================================================
-- Insertion des catégories
-- =====================================================
INSERT INTO categories (id, name, slug, description) VALUES
(UUID(), 'Essentials', 'essentials', 'Pièces intemporelles pour un style quotidien'),
(UUID(), 'Urban', 'urban', 'Collection streetwear urbaine moderne'),
(UUID(), 'Premium', 'premium', 'Luxe et raffinement pour les occasions spéciales');

-- =====================================================
-- Insertion des tailles
-- =====================================================
INSERT INTO sizes (id, name, code, display_order) VALUES
(UUID(), 'Extra Small', 'XS', 1),
(UUID(), 'Small', 'S', 2),
(UUID(), 'Medium', 'M', 3),
(UUID(), 'Large', 'L', 4),
(UUID(), 'Extra Large', 'XL', 5),
(UUID(), 'Double XL', 'XXL', 6);

-- =====================================================
-- Insertion des couleurs
-- =====================================================
INSERT INTO colors (id, name, hex_code) VALUES
(UUID(), 'Noir', '#000000'),
(UUID(), 'Blanc', '#FFFFFF'),
(UUID(), 'Gris', '#808080'),
(UUID(), 'Beige', '#F5F5DC'),
(UUID(), 'Bleu Marine', '#000080'),
(UUID(), 'Kaki', '#8B7355'),
(UUID(), 'Bordeaux', '#800020');

-- =====================================================
-- Vérification des données insérées
-- =====================================================
SELECT 'Categories:' as Table_Name, COUNT(*) as Count FROM categories
UNION ALL
SELECT 'Sizes:', COUNT(*) FROM sizes
UNION ALL
SELECT 'Colors:', COUNT(*) FROM colors;

-- Afficher les données
SELECT * FROM categories;
SELECT * FROM sizes ORDER BY display_order;
SELECT * FROM colors;
