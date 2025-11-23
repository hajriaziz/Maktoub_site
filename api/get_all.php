<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Si la requête est OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once "../db.php";

try {
    $sql = "SELECT id, name, description FROM categories ORDER BY name ASC";
    $stmt = $pdo->query($sql);
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "categories" => $categories
    ]);
} catch (Exception $e) {
    error_log("Error fetching categories: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "error" => "Failed to fetch categories"
    ]);
}
?>
