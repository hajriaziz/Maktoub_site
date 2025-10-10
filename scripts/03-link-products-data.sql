-- Lier les produits aux tailles avec stock
WITH product_ids AS (
  SELECT id, slug FROM products
)
INSERT INTO product_sizes (product_id, size_id, stock_quantity)
SELECT 
  p.id,
  s.id,
  CASE 
    WHEN s.name IN ('S', 'M', 'L') THEN 50
    WHEN s.name IN ('XL') THEN 30
    ELSE 20
  END as stock
FROM product_ids p
CROSS JOIN sizes s
WHERE s.name IN ('S', 'M', 'L', 'XL', 'XXL')
ON CONFLICT (product_id, size_id) DO NOTHING;

-- Lier les produits aux couleurs
WITH product_colors_data AS (
  SELECT p.id as product_id, c.id as color_id
  FROM products p
  CROSS JOIN colors c
  WHERE 
    (p.slug = 'hoodie-noir' AND c.name IN ('Noir', 'Gris')) OR
    (p.slug = 't-shirt-blanc' AND c.name IN ('Blanc', 'Noir', 'Gris')) OR
    (p.slug = 'cargo-noir' AND c.name IN ('Noir', 'Kaki')) OR
    (p.slug = 'bomber-jacket' AND c.name IN ('Noir', 'Bleu Marine')) OR
    (p.slug = 'sweat-gris' AND c.name IN ('Gris', 'Beige', 'Noir')) OR
    (p.slug = 'jean-noir' AND c.name IN ('Noir', 'Bleu Marine')) OR
    (p.slug = 'veste-teddy' AND c.name IN ('Noir', 'Bleu Marine')) OR
    (p.slug = 'chemise-beige' AND c.name IN ('Beige', 'Blanc')) OR
    (p.slug = 'pantalon-costume' AND c.name IN ('Noir', 'Gris'))
)
INSERT INTO product_colors (product_id, color_id)
SELECT product_id, color_id FROM product_colors_data
ON CONFLICT (product_id, color_id) DO NOTHING;

-- Ajouter les images des produits
INSERT INTO product_images (product_id, image_url, display_order)
SELECT p.id, image_url, display_order
FROM products p
CROSS JOIN LATERAL (
  VALUES
    ('/black-hoodie-front.png', 1),
    ('/black-hoodie-back-view.png', 2)
) AS images(image_url, display_order)
WHERE p.slug = 'hoodie-noir'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, display_order)
SELECT p.id, image_url, display_order
FROM products p
CROSS JOIN LATERAL (
  VALUES
    ('/white-t-shirt-minimalist.jpg', 1),
    ('/white-t-shirt-detail.jpg', 2)
) AS images(image_url, display_order)
WHERE p.slug = 't-shirt-blanc'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, display_order)
SELECT p.id, image_url, display_order
FROM products p
CROSS JOIN LATERAL (
  VALUES
    ('/cargo-pants-black-urban.jpg', 1),
    ('/cargo-pants-detail-pockets.jpg', 2)
) AS images(image_url, display_order)
WHERE p.slug = 'cargo-noir'
ON CONFLICT DO NOTHING;

INSERT INTO product_images (product_id, image_url, display_order)
SELECT p.id, image_url, display_order
FROM products p
CROSS JOIN LATERAL (
  VALUES
    ('/luxury-bomber-jacket-black.jpg', 1),
    ('/bomber-jacket-detail.jpg', 2)
) AS images(image_url, display_order)
WHERE p.slug = 'bomber-jacket'
ON CONFLICT DO NOTHING;
