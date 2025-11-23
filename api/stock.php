<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Si la requête est OPTIONS, on arrête ici (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
require_once("../db.php");

$productId = $_GET['productId'] ?? null;
$sizeName = $_GET['size'] ?? null;

if (!$productId || !$sizeName) {
  http_response_code(400);
  echo json_encode(["error" => "Product ID and size required"]);
  exit;
}

try {
  $sql = "SELECT stock FROM products WHERE id = ?";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([$productId]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$row) {
    http_response_code(404);
    echo json_encode(["error" => "Product not found"]);
    exit;
  }

  // Décoder le champ JSON du stock
  $stock = json_decode($row["stock"], true);
  $quantity = $stock[$sizeName] ?? 0;

  echo json_encode([
    "available" => $quantity > 0,
    "quantity" => $quantity
  ]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["error" => "Internal server error"]);
}
?>
