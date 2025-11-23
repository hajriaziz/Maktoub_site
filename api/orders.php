<?php
// orders.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Si la requête est OPTIONS, on arrête ici (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
require_once __DIR__ . "/db.php"; // fichier de connexion PDO

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data || !isset($data['customerInfo'], $data['items'], $data['total'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Missing required fields"]);
            exit;
        }

        $pdo->beginTransaction();

        // --- Création du client ---
        $customerId = uniqid();
        $stmt = $pdo->prepare("INSERT INTO customers (id, first_name, last_name, email, phone)
            VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $customerId,
            $data['customerInfo']['firstName'],
            $data['customerInfo']['lastName'],
            $data['customerInfo']['email'],
            $data['customerInfo']['phone'] ?? null
        ]);

        // --- Création de l'adresse ---
        $addressId = uniqid();
        $stmt = $pdo->prepare("INSERT INTO addresses (id, customer_id, address_line, city, postal_code, country)
            VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $addressId,
            $customerId,
            $data['customerInfo']['address'],
            $data['customerInfo']['city'],
            $data['customerInfo']['postalCode'] ?? null,
            $data['customerInfo']['country'] ?? "France"
        ]);

        // --- Création de la commande ---
        $orderId = uniqid();
        $orderNumber = "MKT-" . time();
        $stmt = $pdo->prepare("INSERT INTO orders 
            (id, order_number, customer_id, shipping_address_id, total_amount, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())");
        $stmt->execute([$orderId, $orderNumber, $customerId, $addressId, $data['total']]);

        // --- Articles ---
        foreach ($data['items'] as $item) {
            $orderItemId = uniqid();
            $stmt = $pdo->prepare("INSERT INTO order_items 
                (id, order_id, product_id, product_name, size, color, quantity, unit_price)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $orderItemId,
                $orderId,
                $item['productId'],
                $item['productName'],
                $item['selectedSize'],
                $item['selectedColor'],
                $item['quantity'],
                $item['price']
            ]);

            // Mise à jour du stock
            $stmtStock = $pdo->prepare("SELECT stock FROM products WHERE id = ?");
            $stmtStock->execute([$item['productId']]);
            $row = $stmtStock->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $stock = json_decode($row['stock'], true);
                $size = $item['selectedSize'];
                if (isset($stock[$size])) {
                    $stock[$size] = max(0, $stock[$size] - $item['quantity']);
                    $stmtUpdate = $pdo->prepare("UPDATE products SET stock = ?, updated_at = NOW() WHERE id = ?");
                    $stmtUpdate->execute([json_encode($stock), $item['productId']]);
                }
            }
        }

        $pdo->commit();

        echo json_encode([
            "success" => true,
            "orderNumber" => $orderNumber,
            "orderId" => $orderId
        ]);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
elseif ($method === 'GET') {
    try {
        $orderNumber = $_GET['order_number'] ?? null;
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
            LEFT JOIN order_items oi ON o.id = oi.order_id";

        $params = [];
        if ($orderNumber) {
            $sql .= " WHERE o.order_number = ?";
            $params[] = $orderNumber;
        }

        $sql .= " GROUP BY o.id ORDER BY o.created_at DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $orders = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $items = [];
            if (!empty($row['items_data'])) {
                foreach (explode('|||', $row['items_data']) as $itemStr) {
                    list($id, $name, $size, $color, $quantity, $price) = explode('::', $itemStr);
                    $items[] = [
                        "id" => $id,
                        "product_name" => $name,
                        "size" => $size,
                        "color" => $color,
                        "quantity" => (int)$quantity,
                        "unit_price" => (float)$price
                    ];
                }
            }

            $orders[] = [
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
                    "phone" => $row['phone'] ?? null
                ],
                "address" => [
                    "address_line" => $row['address_line'],
                    "city" => $row['city'],
                    "postal_code" => $row['postal_code'],
                    "country" => $row['country']
                ],
                "items" => $items
            ];
        }

        echo json_encode(["success" => true, "orders" => $orders]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
