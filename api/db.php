<?php
// 🔧 Paramètres de connexion à la base locale
$host = "localhost";  // localhost ou 127.0.0.1
$dbname = "maktoub_db"; // nom de ta base
$username = "root";     // utilisateur MySQL (par défaut root)
$password = "";          // mot de passe (souvent vide sur WAMP/XAMPP)

// 📦 Connexion PDO
try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  // ⚠️ En cas d’erreur, on renvoie un JSON propre
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "error" => "Échec de connexion à la base de données : " . $e->getMessage()
  ]);
  exit;
}
?>
