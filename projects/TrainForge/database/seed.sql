USE trainforge;

INSERT INTO users (name, email, password_hash, role, is_online)
VALUES
('Admin TrainForge', 'admin@trainforge.local', '$2y$10$JkJwRPLxvnaRJn8cXvVJYOFQYhWJ9eX8n4Zo3fya/8Ur1zj7k4B/u', 'admin', 1),
('Kauai Rocha', 'kauai@trainforge.local', '$2y$10$JkJwRPLxvnaRJn8cXvVJYOFQYhWJ9eX8n4Zo3fya/8Ur1zj7k4B/u', 'trainer', 1),
('Ana Silva', 'ana@trainforge.local', '$2y$10$JkJwRPLxvnaRJn8cXvVJYOFQYhWJ9eX8n4Zo3fya/8Ur1zj7k4B/u', 'student', 0),
('Bruno Costa', 'bruno@trainforge.local', '$2y$10$JkJwRPLxvnaRJn8cXvVJYOFQYhWJ9eX8n4Zo3fya/8Ur1zj7k4B/u', 'student', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO challenges (title, description, modality, points_per_day, is_active, starts_at, ends_at, created_by)
SELECT 'Desafio 7 Dias Cardio', 'Completar 30 minutos de cardio por dia durante 7 dias.', 'Cycling', 15, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), u.id
FROM users u WHERE u.email = 'kauai@trainforge.local'
ON DUPLICATE KEY UPDATE title = title;

INSERT INTO workouts (user_id, challenge_id, exercise, duration_minutes, points, performed_at)
SELECT s.id, c.id, 'Cycling', 45, 20, NOW()
FROM users s
JOIN challenges c
WHERE s.email = 'ana@trainforge.local'
LIMIT 1;

INSERT INTO gyms (name, city)
VALUES ('TrainForge Viseu', 'Viseu')
ON DUPLICATE KEY UPDATE city = VALUES(city);

