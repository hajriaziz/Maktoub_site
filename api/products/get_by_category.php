<?php
ob_clean();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once("../db.php");

try {
    $category_id = $_GET["category_id"] ?? null;

    if ($category_id) {
        $stmt = $pdo->prepare("
            SELECT p.*, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.category_id = ?
            ORDER BY p.featured DESC, p.created_at DESC
        ");
        $stmt->execute([$category_id]);
    } else {
        $stmt = $pdo->query("
            SELECT p.*, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.featured DESC, p.created_at DESC
        ");
    }

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $products = array_map(function($row) {
        // Décodage sécurisé
        $stock = json_decode($row['stock'] ?? '[]', true);
        if (!is_array($stock)) $stock = [];

        $images = json_decode($row['images'] ?? '[]', true);
        if (!is_array($images)) $images = [];

        $totalStock = array_sum($stock);
        $inStock = $totalStock > 0;

        return [
            "id" => $row["id"],
            "name" => $row["name"],
            "price" => (float)$row["price"],
            "images" => $images,
            "inStock" => $inStock,  // AJOUTÉ
            "featured" => (bool)$row["featured"],
            "category" => $row["category_name"] ?? "Sans catégorie",
            "description" => $row["description"] ?? "",
            "stock" => $stock,
        ];
    }, $rows);

    echo json_encode([
        "success" => true,
        "count" => count($products),
        "products" => $products
    ]);

} catch (Throwable $e) {
    error_log("API Error (get_by_category.php): " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Erreur serveur"
    ]);
}
exit;