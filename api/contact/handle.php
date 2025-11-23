<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../db.php";
require_once "../utils.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
    exit;
}

// Récupération des données du formulaire
$type = $_POST['type'] ?? '';

try {
    if ($type === 'contact') {
        $firstName = $_POST['firstName'] ?? '';
        $lastName  = $_POST['lastName'] ?? '';
        $email     = $_POST['email'] ?? '';
        $subject   = $_POST['subject'] ?? '';
        $message   = $_POST['message'] ?? '';

        if (!$firstName || !$lastName || !$email || !$subject || !$message) {
            echo json_encode(["success" => false, "error" => "All fields are required"]);
            exit;
        }

        $id = generate_uuid();
        $sql = "INSERT INTO contact_messages (id, first_name, last_name, email, subject, message)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id, $firstName, $lastName, $email, $subject, $message]);

        echo json_encode(["success" => true, "message" => "Message sent successfully"]);
        exit;
    }

    if ($type === 'subscribe') {
        $email = $_POST['email'] ?? '';

        if (!$email) {
            echo json_encode(["success" => false, "error" => "Email is required"]);
            exit;
        }

        $id = generate_uuid();
        $sql = "INSERT INTO subscriptions (id, email) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);

        try {
            $stmt->execute([$id, $email]);
            echo json_encode(["success" => true, "message" => "Subscription successful"]);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // code erreur SQL unique
                echo json_encode(["success" => true, "message" => "Tu es déjà abonné(e) avec nous !"]);
            } else {
                throw $e;
            }
        }
        exit;
    }

    echo json_encode(["success" => false, "error" => "Invalid request type"]);
} catch (Exception $e) {
    error_log("Error in contact/subscribe: " . $e->getMessage());
    echo json_encode(["success" => false, "error" => "Failed to process request"]);
}
?>
