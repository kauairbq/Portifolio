<?php
$host = getenv('XKAIROS_MYSQL_HOST') ?: (getenv('MYSQL_HOST') ?: 'localhost');
$port = getenv('XKAIROS_MYSQL_PORT') ?: (getenv('MYSQL_PORT') ?: '3306');
$db   = getenv('XKAIROS_MYSQL_DB') ?: (getenv('MYSQL_DB') ?: 'xkairos_db');
$user = getenv('XKAIROS_MYSQL_USER') ?: (getenv('MYSQL_USER') ?: 'root');
$pass = getenv('XKAIROS_MYSQL_PASSWORD') ?: (getenv('MYSQL_PASSWORD') ?: '');
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die('Erro DB: '.$e->getMessage());
}
