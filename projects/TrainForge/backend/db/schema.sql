CREATE DATABASE IF NOT EXISTS trainforge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trainforge;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'trainer', 'client') NOT NULL DEFAULT 'client',
    birth_date DATE NULL,
    address VARCHAR(255) NULL,
    payment_info JSON NULL,
    mode ENUM('online', 'presencial') NOT NULL DEFAULT 'online',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_token CHAR(36) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    refresh_token_hash VARCHAR(255) NOT NULL,
    user_agent VARCHAR(255) NULL,
    ip_address VARCHAR(64) NULL,
    expires_at DATETIME NOT NULL,
    revoked_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sessions_user_id (user_id),
    INDEX idx_sessions_expires_at (expires_at)
);

CREATE TABLE IF NOT EXISTS challenges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(140) NOT NULL,
    description TEXT NULL,
    modality VARCHAR(80) NOT NULL DEFAULT 'General',
    weekly_target INT NOT NULL DEFAULT 5,
    points_per_completion INT NOT NULL DEFAULT 10,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    starts_at DATE NOT NULL,
    ends_at DATE NOT NULL,
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_challenges_creator FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    challenge_id INT NULL,
    title VARCHAR(140) NOT NULL,
    modality VARCHAR(80) NOT NULL DEFAULT 'General',
    duration_minutes INT NOT NULL DEFAULT 0,
    calories INT NOT NULL DEFAULT 0,
    points INT NOT NULL DEFAULT 0,
    completed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_workouts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_workouts_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE SET NULL,
    INDEX idx_workouts_user_id (user_id),
    INDEX idx_workouts_challenge_id (challenge_id)
);

CREATE TABLE IF NOT EXISTS challenge_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    user_id INT NOT NULL,
    workout_id INT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    score_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_scores_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    CONSTRAINT fk_scores_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_scores_workout FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
    UNIQUE KEY uq_challenge_user_workout (challenge_id, user_id, workout_id)
);

CREATE TABLE IF NOT EXISTS service_catalog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_service_catalog_creator FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS service_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    notes TEXT NULL,
    status ENUM('pending', 'approved', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_service_requests_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_service_requests_service FOREIGN KEY (service_id) REFERENCES service_catalog(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_request_id BIGINT NULL,
    budget_estimate DECIMAL(10,2) NULL,
    notes TEXT NULL,
    status ENUM('open', 'sent', 'accepted', 'rejected') NOT NULL DEFAULT 'open',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quote_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_quote_request FOREIGN KEY (service_request_id) REFERENCES service_requests(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(140) NOT NULL,
    message TEXT NOT NULL,
    rating TINYINT NOT NULL DEFAULT 5,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS support_tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(140) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'closed') NOT NULL DEFAULT 'open',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_support_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
