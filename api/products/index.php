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
require_once("../utils.php");

$category_id = $_GET['category_id'] ?? null;
$featured = $_GET['featured'] ?? null;

try {
    $sql = "
        SELECT 
            p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    ";

    $conditions = [];
    $params = [];

    if ($category_id) {
        $conditions[] = "p.category_id = ?";
        $params[] = $category_id;
    }
    if ($featured === "true") {
        $conditions[] = "p.featured = 1";
    }

    if ($conditions) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    $sql .= " ORDER BY p.featured DESC, p.created_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$products = array_map(function($row) {
    $stock = json_decode($row['stock'] ?? '[]', true) ?: [];
    return [
        "id" => $row["id"], // ✅ UUID, pas int
        "name" => $row["name"],
        "price" => (float)$row["price"],
        "images" => json_decode($row["images"] ?? '[]', true) ?: [],
        "inStock" => isProductInStock($row["stock"]),
        "featured" => (bool)$row["featured"],
        "category" => $row["category_name"]
    ];
}, $rows);


    echo json_encode(["success" => true, "products" => $products]);

} catch (Throwable $e) {
    error_log("API Error (index.php): " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Server error"]);
}
exit;
