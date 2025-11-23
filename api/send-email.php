<?php
ob_clean(); // Au début
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Préflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . "/db.php";
require __DIR__ . "/vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Lire JSON
$input = json_decode(file_get_contents("php://input"), true);
$commandeId = $input["commandeId"] ?? null;

if (!$commandeId) {
    http_response_code(400);
    echo json_encode(["error" => "commandeId manquant"]);
    exit;
}

try {
    // 1. Récupérer commande + client
    $sql = "SELECT o.*, c.first_name, c.last_name, c.email 
            FROM orders o 
            JOIN customers c ON o.customer_id = c.id 
            WHERE o.id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$commandeId]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$order) {
        http_response_code(404);
        echo json_encode(["error" => "Commande non trouvée"]);
        exit;
    }

    // 2. Articles
    $sql = "SELECT product_name, size, color, quantity, unit_price FROM order_items WHERE order_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$commandeId]);
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Tableau HTML
    $itemsHtml = "";
    foreach ($items as $item) {
        $total = number_format($item["quantity"] * $item["unit_price"], 2);
        $itemsHtml .= "
            <tr>
                <td style='padding:10px;border:1px solid #ddd;'>{$item['product_name']}</td>
                <td style='padding:10px;border:1px solid #ddd;'>{$item['size']}</td>
                <td style='padding:10px;border:1px solid #ddd;'>{$item['color']}</td>
                <td style='padding:10px;border:1px solid #ddd;'>{$item['quantity']}</td>
                <td style='padding:10px;border:1px solid #ddd;'>{$item['unit_price']} TND</td>
                <td style='padding:10px;border:1px solid #ddd;'>{$total} TND</td>
            </tr>
        ";
    }

    // 4. PHPMailer + UTF-8 FORCÉ
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';                    // FORCER UTF-8
    $mail->Encoding = 'quoted-printable';        // Meilleur pour UTF-8
    $mail->isSMTP();
    $mail->Host = getenv("SMTP_HOST") ?: "maktouj.cluster100.hosting.ovh.net";
    $mail->Port = getenv("SMTP_PORT") ?: 587;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Username = getenv("SMTP_USER") ?: "boutique.tn@maktoub-tunisie.com";
    $mail->Password = getenv("SMTP_PASS") ?: "maktoub123456";

    $mail->setFrom(getenv("SMTP_FROM") ?: "boutique.tn@maktoub-tunisie.com", "Maktoub");
    $mail->addAddress($order["email"], "{$order["first_name"]} {$order["last_name"]}");
    $mail->isHTML(true);
    $mail->Subject = "Confirmation de commande Maktoub - #{$order["order_number"]}";

    // 5. Corps HTML + UTF-8
    $mail->Body = "
    <!DOCTYPE html>
    <html lang='fr'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Confirmation de commande</title>
    </head>
    <body style='font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#f9f9f9;'>
        <div style='background:#1a5f5a;padding:20px;text-align:center;color:white;'>
            <h1 style='margin:0;font-size:28px;'>Maktoub</h1>
            <p style='margin:10px 0 0;'>Merci pour votre commande !</p>
        </div>
        <div style='padding:20px;background:white;'>
            <p>Bonjour <strong>{$order["first_name"]} {$order["last_name"]}</strong>,</p>
            <p>Votre commande <strong>#{$order["order_number"]}</strong> a bien été reçue.</p>
            <h2 style='color:#1a5f5a;'>Détails de votre commande :</h2>
            <table style='width:100%;border-collapse:collapse;margin:20px 0;'>
                <thead>
                    <tr style='background:#f0f0f0;'>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Produit</th>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Taille</th>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Couleur</th>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Quantité</th>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Prix unitaire</th>
                        <th style='padding:10px;border:1px solid #ddd;text-align:left;'>Total</th>
                    </tr>
                </thead>
                <tbody>{$itemsHtml}</tbody>
                <tfoot>
                    <tr>
                        <td colspan='5' style='text-align:right;padding:10px;border:1px solid #ddd;'><strong>Total :</strong></td>
                        <td style='padding:10px;border:1px solid #ddd;'><strong>{$order["total_amount"]} TND</strong></td>
                    </tr>
                </tfoot>
            </table>
            <p><strong>Statut :</strong> <span style='color:#e67e22;'>{$order["status"]}</span></p>
            <p>Nous vous tiendrons informé de l'avancement.</p>
        </div>
        <div style='background:#1a5f5a;padding:15px;text-align:center;font-size:12px;color:#fff;'>
            <p style='margin:0;'>© 2024 Maktoub. Tous droits réservés.</p>
        </div>
    </body>
    </html>
    ";

    // 6. Envoi
    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Email envoyé avec succès",
        "orderNumber" => $order["order_number"]
    ]);

} catch (Exception $e) {
    error_log("Erreur envoi email: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Échec envoi email", "details" => $e->getMessage()]);
}
exit;