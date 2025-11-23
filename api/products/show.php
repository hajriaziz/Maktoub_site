<?php
ob_clean();
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once("../db.php");

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Missing product ID"
    ]);
    exit;
}

try {
    $sql = "
        SELECT 
            p.*, 
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
        LIMIT 1
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "error" => "Product not found"
        ]);
        exit;
    }

    // Décodage JSON sécurisé
    $decodeOrEmpty = function ($value) {
        $decoded = json_decode($value ?? '[]', true);
        return is_array($decoded) ? $decoded : [];
    };

    $stock = $decodeOrEmpty($row['stock']);
    $images = $decodeOrEmpty($row['images']);
    $sizes = $decodeOrEmpty($row['sizes']);
    $colors = $decodeOrEmpty($row['colors']);

    $product = [
        "id" => $row["id"],
        "name" => $row["name"],
        "description" => $row["description"],
        "longDescription" => $row["long_description"],
        "price" => (float)$row["price"],
        "categoryId" => (int)$row["category_id"],
        "category" => $row["category_name"],
        "images" => $images,
        "sizes" => $sizes,
        "colors" => $colors,
        "stock" => $stock,
        "inStock" => array_sum($stock) > 0,
        "featured" => (bool)$row["featured"],
        "createdAt" => $row["created_at"],
    ];

    echo json_encode([
        "success" => true,
        "product" => $product
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;

} catch (Throwable $e) {
    error_log("❌ API Error (show.php): " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Server error"
    ]);
    exit;
}
