<?php
$host = getenv('XKAIROS_MYSQL_HOST') ?: (getenv('MYSQL_HOST') ?: 'localhost');
$port = getenv('XKAIROS_MYSQL_PORT') ?: (getenv('MYSQL_PORT') ?: '3306');
$user = getenv('XKAIROS_MYSQL_USER') ?: (getenv('MYSQL_USER') ?: 'root');
$pass = getenv('XKAIROS_MYSQL_PASSWORD') ?: (getenv('MYSQL_PASSWORD') ?: '');
$db = getenv('XKAIROS_MYSQL_DB') ?: (getenv('MYSQL_DB') ?: 'xkairos_db');

$conn = new mysqli($host, $user, $pass, $db, (int) $port);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
?>
