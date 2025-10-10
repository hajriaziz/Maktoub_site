-- Insertion des tailles standard
INSERT INTO sizes (name, display_order) VALUES
  ('XS', 1),
  ('S', 2),
  ('M', 3),
  ('L', 4),
  ('XL', 5),
  ('XXL', 6)
ON CONFLICT (name) DO NOTHING;

-- Insertion des couleurs de base
INSERT INTO colors (name, hex_code) VALUES
  ('Noir', '#000000'),
  ('Blanc', '#FFFFFF'),
  ('Gris', '#808080'),
  ('Beige', '#F5F5DC'),
  ('Bleu Marine', '#000080'),
  ('Kaki', '#8B7355')
ON CONFLICT DO NOTHING;

-- Insertion des catégories
INSERT INTO categories (name, slug, description) VALUES
  ('Essentials', 'essentials', 'Pièces intemporelles pour votre garde-robe'),
  ('Urban', 'urban', 'Style urbain moderne et audacieux'),
  ('Premium', 'premium', 'Collection luxe et raffinement')
ON CONFLICT (slug) DO NOTHING;

-- Insertion des produits (en utilisant les IDs des catégories)
WITH cat_essentials AS (SELECT id FROM categories WHERE slug = 'essentials'),
     cat_urban AS (SELECT id FROM categories WHERE slug = 'urban'),
     cat_premium AS (SELECT id FROM categories WHERE slug = 'premium')

INSERT INTO products (name, slug, description, long_description, price, category_id, in_stock, featured)
SELECT * FROM (VALUES
  (
    'Hoodie Noir Essentiel',
    'hoodie-noir',
    'Hoodie premium en coton biologique',
    'Notre hoodie signature combine confort et style. Fabriqué en coton biologique premium, il offre une coupe moderne et décontractée. Parfait pour un look streetwear sophistiqué.',
    89.99,
    (SELECT id FROM cat_essentials),
    true,
    true
  ),
  (
    'T-Shirt Blanc Minimaliste',
    't-shirt-blanc',
    'T-shirt essentiel en coton premium',
    'Un basique revisité avec une attention particulière aux détails. Coupe ajustée, col renforcé et finitions soignées. Le t-shirt parfait pour toutes les occasions.',
    45.00,
    (SELECT id FROM cat_essentials),
    true,
    true
  ),
  (
    'Pantalon Cargo Noir',
    'cargo-noir',
    'Cargo urbain avec poches fonctionnelles',
    'Design urbain moderne avec multiples poches cargo. Tissu technique résistant et confortable. Coupe ajustée pour un style contemporain.',
    120.00,
    (SELECT id FROM cat_urban),
    true,
    false
  ),
  (
    'Bomber Jacket Premium',
    'bomber-jacket',
    'Veste bomber luxe en nylon technique',
    'Bomber jacket haut de gamme avec doublure satinée. Matériaux techniques premium et finitions impeccables. Une pièce statement pour votre garde-robe.',
    250.00,
    (SELECT id FROM cat_premium),
    true,
    true
  ),
  (
    'Sweat Oversize Gris',
    'sweat-gris',
    'Sweatshirt oversize confortable',
    'Coupe oversize tendance en molleton épais. Confort maximal avec un style décontracté. Parfait pour un look streetwear relaxed.',
    75.00,
    (SELECT id FROM cat_essentials),
    true,
    false
  ),
  (
    'Jean Slim Noir',
    'jean-noir',
    'Jean slim stretch premium',
    'Denim premium avec stretch pour un confort optimal. Coupe slim moderne et délavage subtil. Un essentiel pour toute garde-robe.',
    95.00,
    (SELECT id FROM cat_urban),
    true,
    false
  ),
  (
    'Veste Teddy Luxe',
    'veste-teddy',
    'Veste teddy en laine premium',
    'Veste teddy classique revisitée avec des matériaux luxueux. Laine premium et détails en cuir. Une pièce intemporelle et élégante.',
    320.00,
    (SELECT id FROM cat_premium),
    true,
    false
  ),
  (
    'Chemise Oversize Beige',
    'chemise-beige',
    'Chemise oversize en coton',
    'Chemise oversize tendance en coton léger. Coupe ample et décontractée. Parfaite pour un style urbain sophistiqué.',
    85.00,
    (SELECT id FROM cat_urban),
    true,
    false
  ),
  (
    'Pantalon Costume Noir',
    'pantalon-costume',
    'Pantalon de costume premium',
    'Pantalon de costume en laine mérinos. Coupe droite élégante et finitions impeccables. Pour un look formel raffiné.',
    180.00,
    (SELECT id FROM cat_premium),
    true,
    false
  )
) AS v(name, slug, description, long_description, price, category_id, in_stock, featured)
ON CONFLICT (slug) DO NOTHING;
