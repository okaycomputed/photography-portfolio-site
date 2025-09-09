<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';
$config = require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit(0);
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Symbols have already been sanitized through client-side, removes whitespace for better readability
$firstName = trim($data["firstName"]);
$lastName = trim($data["lastName"]);

// Removes any characters that may contain malicious code
$email = filter_var($data["email"], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars($data["message"]);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config["SMTP_HOST"];
    $mail->Port = $config["PORT"];
    $mail->SMTPSecure = "tls";
    $mail->SMTPAuth = true;
    $mail->Username = $config["SMTP_USERNAME"];
    $mail->Password = $config["SMTP_PASSWORD"];

    // Sends email via smtp
    $mail->setFrom($config["SMTP_USERNAME"], "Portfolio Website");

    // Allows a reply to the person who sent the enquiry form
    $mail->addReplyTo($email, $firstName . " " . $lastName);

    // Email is sent to the destination address
    $mail->addAddress($config["EMAIL"]);

    $mail->isHTML(true);
    $mail->Subject = "Inquiry From Portfolio Website";
    $mail->Body = $message;

    $mail->SMTPDebug = 2;
    $mail->Debugoutput = 'error_log';

    $mail->send();

    echo json_encode(["status" => "success"]);

} catch(Exception $e) {
    echo json_encode(["status" => "error"]);
}    
