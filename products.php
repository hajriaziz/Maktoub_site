<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ Préflight pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once("../db.php");

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    // 🔹 Récupérer tous les produits
    $sql = "
        SELECT 
            p.*,
            c.name as category_name,
            c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$products = array_map(function ($row) {
    $stock = json_decode($row["stock"], true) ?? [];
    $inStock = false;
    foreach ($stock as $qty) {
        if ($qty > 0) {
            $inStock = true;
            break;
        }
    }

    return [
        "id" => $row["id"],
        "name" => $row["name"],
        "slug" => $row["slug"],
        "description" => $row["description"],
        "longDescription" => $row["long_description"],
        "price" => floatval($row["price"]),
        "categoryId" => $row["category_id"],
        "categoryName" => $row["category_name"],
        "categorySlug" => $row["category_slug"],
        "images" => json_decode($row["images"], true),
        "sizes" => json_decode($row["sizes"], true),
        "colors" => json_decode($row["colors"], true),
        "stock" => $stock,
        "inStock" => $inStock,  // AJOUTÉ ICI
        "featured" => boolval($row["featured"]),
        "createdAt" => $row["created_at"],
        "updatedAt" => $row["updated_at"],
    ];
}, $rows);

    echo json_encode(["success" => true, "products" => $products]);
    exit;
}

if ($method === "POST") {
    // Récupérer les champs
    $name = $_POST["name"] ?? null;
    $slug = $_POST["slug"] ?? null;
    $description = $_POST["description"] ?? "";
    $longDescription = $_POST["longDescription"] ?? "";
    $price = $_POST["price"] ?? null;
    $categoryId = $_POST["categoryId"] ?? null;
    $featured = ($_POST["featured"] ?? "false") === "true";

    // DÉCODER LES CHAMPS JSON (CRUCIAL)
    $sizes = isset($_POST["sizes"]) ? json_decode($_POST["sizes"], true) : [];
    // Dans admin/products.php (POST)
    $stock = isset($_POST['stock']) ? $_POST['stock'] : '[]';
    if ($stock === '{}') $stock = '[]';  // ← CORRECTION
    $colors = isset($_POST["colors"]) ? json_decode($_POST["colors"], true) : [];

    // Validation
    if (!$name || !$slug || !$price || !$categoryId) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Missing required fields"]);
        exit;
    }

    // Vérifier slug unique
    $stmt = $pdo->prepare("SELECT id FROM products WHERE slug = ?");
    $stmt->execute([$slug]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Slug already exists"]);
        exit;
    }

    // Gestion des images
    $uploadsDir = __DIR__ . "/../public/uploads/";
    if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0777, true);

    $images = [];
    if (isset($_FILES["images"])) {
        foreach ($_FILES["images"]["tmp_name"] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $ext = pathinfo($_FILES["images"]["name"][$index], PATHINFO_EXTENSION);
                $fileName = uniqid() . "." . $ext;
                $filePath = $uploadsDir . $fileName;
                move_uploaded_file($tmpName, $filePath);
                $images[] = "/uploads/" . $fileName;
            }
        }
    }

    // ID + Insertion
    $productId = uniqid();

    $sql = "
        INSERT INTO products (
            id, name, slug, description, long_description, price, category_id,
            images, sizes, colors, stock, featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ";

    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute([
        $productId,
        $name,
        $slug,
        $description,
        $longDescription,
        floatval($price),
        $categoryId,
        json_encode($images),
        json_encode($sizes),    // ← tableau décodé → JSON propre
        json_encode($colors),   // ← idem
        json_encode($stock),    // ← CORRIGÉ : tableau, pas chaîne
        $featured
    ]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Produit créé", "productId" => $productId]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Database error"]);
    }
    exit;
}

echo json_encode(["success" => false, "error" => "Unsupported method"]);
