-- ============================================
-- DONNÉES INITIALES - SCHÉMA SIMPLIFIÉ
-- ============================================

-- Insérer les catégories (Homme et Femme uniquement)
INSERT INTO categories (id, name, slug, description) VALUES
('cat-homme', 'Homme', 'homme', 'Collection pour homme - Streetwear luxe'),
('cat-femme', 'Femme', 'femme', 'Collection pour femme - Streetwear luxe');

-- ============================================
-- PRODUITS HOMME
-- ============================================

-- Hoodie Noir Homme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-hoodie-noir-h',
  'Hoodie Noir Essentiel',
  'hoodie-noir-homme',
  'Hoodie premium en coton biologique pour homme',
  'Notre hoodie signature combine confort et style urbain. Fabriqué en coton biologique premium avec une coupe moderne et des finitions soignées. Parfait pour un look streetwear sophistiqué.',
  89.99,
  'cat-homme',
  JSON_ARRAY('/black-hoodie-front.png', '/black-hoodie-back-view.png'),
  JSON_ARRAY('S', 'M', 'L', 'XL', 'XXL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Noir', 'hex', '#000000'),
    JSON_OBJECT('name', 'Gris', 'hex', '#808080')
  ),
  JSON_OBJECT('S', 10, 'M', 15, 'L', 20, 'XL', 12, 'XXL', 8),
  TRUE
);

-- T-shirt Blanc Homme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-tshirt-blanc-h',
  'T-shirt Blanc Minimaliste',
  'tshirt-blanc-homme',
  'T-shirt essentiel en coton premium pour homme',
  'Un basique revisité avec une attention particulière aux détails. Coupe ajustée, col renforcé et tissu de qualité supérieure pour un confort optimal au quotidien.',
  45.99,
  'cat-homme',
  JSON_ARRAY('/white-t-shirt-minimalist.jpg', '/white-t-shirt-detail.jpg'),
  JSON_ARRAY('S', 'M', 'L', 'XL', 'XXL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Blanc', 'hex', '#FFFFFF'),
    JSON_OBJECT('name', 'Beige', 'hex', '#F5F5DC')
  ),
  JSON_OBJECT('S', 20, 'M', 25, 'L', 30, 'XL', 15, 'XXL', 10),
  TRUE
);

-- Cargo Noir Homme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-cargo-noir-h',
  'Cargo Noir Urban',
  'cargo-noir-homme',
  'Pantalon cargo technique style urbain pour homme',
  'Pantalon cargo moderne avec multiples poches fonctionnelles. Tissu résistant et confortable, parfait pour un style streetwear authentique avec une touche technique.',
  119.99,
  'cat-homme',
  JSON_ARRAY('/cargo-pants-black-urban.jpg', '/cargo-pants-detail-pockets.jpg'),
  JSON_ARRAY('S', 'M', 'L', 'XL', 'XXL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Noir', 'hex', '#000000'),
    JSON_OBJECT('name', 'Kaki', 'hex', '#8B7355')
  ),
  JSON_OBJECT('S', 8, 'M', 12, 'L', 15, 'XL', 10, 'XXL', 5),
  FALSE
);

-- Bomber Jacket Homme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-bomber-noir-h',
  'Bomber Jacket Premium',
  'bomber-jacket-homme',
  'Veste bomber luxe en nylon technique pour homme',
  'Bomber jacket haut de gamme avec doublure satinée et finitions premium. Design intemporel revisité avec des détails modernes pour un look sophistiqué.',
  249.99,
  'cat-homme',
  JSON_ARRAY('/luxury-bomber-jacket-black.jpg', '/bomber-jacket-detail.jpg'),
  JSON_ARRAY('S', 'M', 'L', 'XL', 'XXL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Noir', 'hex', '#000000'),
    JSON_OBJECT('name', 'Marine', 'hex', '#000080')
  ),
  JSON_OBJECT('S', 5, 'M', 8, 'L', 10, 'XL', 6, 'XXL', 3),
  TRUE
);

-- ============================================
-- PRODUITS FEMME
-- ============================================

-- Hoodie Oversized Femme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-hoodie-oversized-f',
  'Hoodie Oversized Femme',
  'hoodie-oversized-femme',
  'Hoodie coupe oversized confortable pour femme',
  'Hoodie à la coupe décontractée et moderne. Parfait pour un style streetwear féminin avec une touche de sophistication. Tissu doux et respirant.',
  85.99,
  'cat-femme',
  JSON_ARRAY('/placeholder.svg?height=600&width=400', '/placeholder.svg?height=600&width=400'),
  JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Beige', 'hex', '#F5F5DC'),
    JSON_OBJECT('name', 'Rose', 'hex', '#FFB6C1')
  ),
  JSON_OBJECT('XS', 12, 'S', 18, 'M', 20, 'L', 15, 'XL', 8),
  TRUE
);

-- Crop Top Femme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-crop-top-f',
  'Crop Top Essential',
  'crop-top-femme',
  'Crop top ajusté en coton stretch pour femme',
  'Crop top moderne et polyvalent. Coupe flatteuse et tissu de qualité pour un confort optimal. Idéal pour créer des looks streetwear tendance.',
  39.99,
  'cat-femme',
  JSON_ARRAY('/placeholder.svg?height=600&width=400', '/placeholder.svg?height=600&width=400'),
  JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Blanc', 'hex', '#FFFFFF'),
    JSON_OBJECT('name', 'Noir', 'hex', '#000000')
  ),
  JSON_OBJECT('XS', 15, 'S', 20, 'M', 25, 'L', 18, 'XL', 10),
  FALSE
);

-- Jogger Femme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-jogger-f',
  'Jogger Confort Femme',
  'jogger-femme',
  'Pantalon jogger confortable style athleisure pour femme',
  'Jogger au style décontracté chic. Taille élastique et coupe moderne pour un maximum de confort sans compromettre le style.',
  95.99,
  'cat-femme',
  JSON_ARRAY('/placeholder.svg?height=600&width=400', '/placeholder.svg?height=600&width=400'),
  JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Gris', 'hex', '#808080'),
    JSON_OBJECT('name', 'Noir', 'hex', '#000000')
  ),
  JSON_OBJECT('XS', 10, 'S', 15, 'M', 18, 'L', 12, 'XL', 7),
  FALSE
);

-- Veste Teddy Femme
INSERT INTO products (
  id, name, slug, description, long_description, price, category_id,
  images, sizes, colors, stock, featured
) VALUES (
  'prod-teddy-f',
  'Veste Teddy Luxe',
  'veste-teddy-femme',
  'Veste teddy douce et chaude pour femme',
  'Veste teddy ultra-douce avec finitions premium. Parfaite pour les journées fraîches tout en gardant un style urbain sophistiqué.',
  189.99,
  'cat-femme',
  JSON_ARRAY('/placeholder.svg?height=600&width=400', '/placeholder.svg?height=600&width=400'),
  JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
  JSON_ARRAY(
    JSON_OBJECT('name', 'Beige', 'hex', '#F5F5DC'),
    JSON_OBJECT('name', 'Marron', 'hex', '#8B4513')
  ),
  JSON_OBJECT('XS', 6, 'S', 10, 'M', 12, 'L', 8, 'XL', 4),
  TRUE
);
