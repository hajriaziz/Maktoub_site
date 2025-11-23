<?php
// order.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Si la requête est OPTIONS, on arrête ici (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
require_once __DIR__ . "/db.php";

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Order ID required"]);
    exit;
}

if ($method === 'GET') {
    try {
        $sql = "
            SELECT 
                o.id, o.order_number, o.status, o.total_amount, o.created_at, o.updated_at,
                c.first_name, c.last_name, c.email, c.phone,
                a.address_line, a.city, a.postal_code, a.country,
                GROUP_CONCAT(
                    CONCAT_WS('::', oi.id, oi.product_name, oi.size, oi.color, oi.quantity, oi.unit_price)
                    SEPARATOR '|||'
                ) AS items_data
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            JOIN addresses a ON o.shipping_address_id = a.id
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.id = ?
            GROUP BY o.id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(404);
            echo json_encode(["error" => "Order not found"]);
            exit;
        }

        $items = [];
        if (!empty($row['items_data'])) {
            foreach (explode('|||', $row['items_data']) as $itemStr) {
                list($iid, $name, $size, $color, $quantity, $price) = explode('::', $itemStr);
                $items[] = [
                    "id" => $iid,
                    "product_name" => $name,
                    "size" => $size,
                    "color" => $color,
                    "quantity" => (int)$quantity,
                    "unit_price" => (float)$price
                ];
            }
        }

        $order = [
            "id" => $row['id'],
            "order_number" => $row['order_number'],
            "status" => $row['status'],
            "total_amount" => (float)$row['total_amount'],
            "created_at" => $row['created_at'],
            "updated_at" => $row['updated_at'],
            "customer" => [
                "first_name" => $row['first_name'],
                "last_name" => $row['last_name'],
                "email" => $row['email'],
                "phone" => $row['phone']
            ],
            "address" => [
                "address_line" => $row['address_line'],
                "city" => $row['city'],
                "postal_code" => $row['postal_code'],
                "country" => $row['country']
            ],
            "items" => $items
        ];

        echo json_encode(["order" => $order]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
elseif ($method === 'PATCH') {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
        $status = $body['status'] ?? null;
        if (!$status) {
            http_response_code(400);
            echo json_encode(["error" => "Status required"]);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$status, $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Order not found"]);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id, order_number, status, total_amount, created_at, updated_at FROM orders WHERE id = ?");
        $stmt->execute([$id]);
        $updated = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode(["order" => $updated]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
