<?php
ob_clean(); // AU DÉBUT
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once("../db.php");

$method = $_SERVER["REQUEST_METHOD"];
$id = $_GET["id"] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Missing product ID"]);
    exit;
}

if ($method === "PATCH" || $method === "POST") {
    $updates = [];
    $values = [];

    try {
        foreach (["name","slug","description","longDescription","price","categoryId","stock","sizes","colors","featured"] as $field) {
            if (isset($_POST[$field])) {
                $col = $field === "longDescription" ? "long_description" :
                       ($field === "categoryId" ? "category_id" : $field);

                $value = $_POST[$field];

                // Conversion featured
                if ($field === "featured") {
                    $value = in_array($value, ["true", true, "1", 1], true) ? 1 : 0;
                }
                // Décodage + RE-ENCODAGE pour JSON
                elseif (in_array($field, ["stock", "sizes", "colors"])) {
                    $decoded = json_decode($value, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        error_log("JSON decode error for $field: " . json_last_error_msg());
                        continue;
                    }
                    $value = json_encode($decoded); // RE-ENCODÉ EN CHAÎNE
                }
                // Autres champs
                else {
                    $value = trim($value);
                }

                $updates[] = "$col = ?";
                $values[] = $value;
            }
        }

        // === GESTION IMAGES ===
        $uploadsDir = __DIR__ . "/../../public/uploads/";
        if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);

        $newImages = [];
        if (isset($_FILES["images"]) && is_array($_FILES["images"]["tmp_name"])) {
            foreach ($_FILES["images"]["tmp_name"] as $i => $tmpName) {
                if ($tmpName && is_uploaded_file($tmpName)) {
                    $ext = pathinfo($_FILES["images"]["name"][$i], PATHINFO_EXTENSION);
                    $fileName = uniqid("img_") . "." . $ext;
                    $filePath = $uploadsDir . $fileName;
                    if (move_uploaded_file($tmpName, $filePath)) {
                        $newImages[] = "/uploads/" . $fileName;
                    }
                }
            }
        }

        if (!empty($newImages)) {
            $stmt = $pdo->prepare("SELECT images FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $existing = json_decode($stmt->fetchColumn() ?: "[]", true);
            $merged = array_merge($existing, $newImages);
            $updates[] = "images = ?";
            $values[] = json_encode($merged); // EN CHAÎNE
        }

        if (empty($updates)) {
            echo json_encode(["success" => false, "error" => "Aucun champ à mettre à jour"]);
            exit;
        }

        // === REQUÊTE FINALE ===
        $sql = "UPDATE products SET " . implode(", ", $updates) . " WHERE id = ?";
        $values[] = $id;

        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        echo json_encode(["success" => true, "message" => "Produit mis à jour"]);
    } catch (Exception $e) {
        error_log("Update error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Erreur serveur", "details" => $e->getMessage()]);
    }
    exit;
}

// === SUPPRESSION ===
if ($method === "DELETE") {
    try {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Produit supprimé"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Échec suppression"]);
    }
    exit;
}

echo json_encode(["success" => false, "error" => "Méthode non supportée"]);
exit;