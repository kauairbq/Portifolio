<?php

declare(strict_types=1);

// Teste simples de contrato para endpoint de health/auth.
$health = @file_get_contents('http://localhost/Fullstack%20MD/projects/TrainForge/backend/api/health.php');
if ($health === false) {
    fwrite(STDERR, "Falha: API health não respondeu.\n");
    exit(1);
}

echo "OK: health endpoint respondeu.\n";

