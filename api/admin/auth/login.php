<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // à sécuriser selon ton domaine
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once(__DIR__ . "/../../db.php");
require_once(__DIR__ . "/../../jwt.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "error" => "Email and password are required"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT id, email, password, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
        exit;
    }

    // ⚠️ Pour le moment, tu compares directement les mots de passe en clair
    // Mais si tu veux sécuriser plus tard : utilise password_hash() et password_verify()
    if ($password !== $user['password']) {
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
        exit;
    }

    // Génération du token JWT
    $token = generate_jwt([
        "id" => $user['id'],
        "email" => $user['email'],
        "role" => $user['role']
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "email" => $user['email'],
            "role" => $user['role']
        ]
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Failed to login"]);
}
?>
