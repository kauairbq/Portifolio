USE trainforge;

INSERT INTO users (full_name, email, password_hash, role, birth_date, address, payment_info, mode)
VALUES
('Admin TrainForge', 'admin@trainforge.local', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgw8L6Y4xXHzkwmo7aXstixkmK.e', 'admin', '1988-10-01', 'Viseu, Portugal', JSON_OBJECT('plan', 'enterprise', 'provider', 'manual'), 'online'),
('Kauai Rocha', 'kauai@trainforge.local', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgw8L6Y4xXHzkwmo7aXstixkmK.e', 'trainer', '1991-07-22', 'Viseu, Portugal', JSON_OBJECT('plan', 'pro', 'provider', 'manual'), 'presencial'),
('Ana Silva', 'ana@trainforge.local', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgw8L6Y4xXHzkwmo7aXstixkmK.e', 'client', '1997-03-14', 'Porto, Portugal', JSON_OBJECT('plan', 'starter', 'provider', 'visa'), 'online'),
('Bruno Costa', 'bruno@trainforge.local', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgw8L6Y4xXHzkwmo7aXstixkmK.e', 'client', '1995-11-08', 'Lisboa, Portugal', JSON_OBJECT('plan', 'starter', 'provider', 'mastercard'), 'presencial')
ON DUPLICATE KEY UPDATE
    full_name = VALUES(full_name),
    role = VALUES(role),
    address = VALUES(address),
    mode = VALUES(mode),
    payment_info = VALUES(payment_info);

INSERT INTO challenges (title, description, modality, weekly_target, points_per_completion, is_active, starts_at, ends_at, created_by)
SELECT
    'Challenge Semanal - Consistencia',
    'Completar 5 treinos no periodo semanal para subir no ranking global.',
    'Musculacao',
    5,
    15,
    1,
    CURDATE(),
    DATE_ADD(CURDATE(), INTERVAL 7 DAY),
    u.id
FROM users u
WHERE u.email = 'kauai@trainforge.local'
LIMIT 1;

INSERT INTO service_catalog (name, description, is_active, created_by)
SELECT 'Plano Online', 'Plano de treinos online com acompanhamento semanal.', 1, u.id
FROM users u WHERE u.email = 'kauai@trainforge.local' LIMIT 1;

INSERT INTO service_catalog (name, description, is_active, created_by)
SELECT 'Acompanhamento Presencial', 'Sessao presencial com avaliacao fisica e progresso.', 1, u.id
FROM users u WHERE u.email = 'kauai@trainforge.local' LIMIT 1;

INSERT INTO service_catalog (name, description, is_active, created_by)
SELECT 'Relatorio de Performance', 'Relatorio mensal com indicadores de evolucao.', 1, u.id
FROM users u WHERE u.email = 'kauai@trainforge.local' LIMIT 1;

INSERT INTO workouts (user_id, challenge_id, title, modality, duration_minutes, calories, points, completed_at)
SELECT c.id, ch.id, 'Treino de Forca', 'Musculacao', 55, 380, 18, NOW()
FROM users c
JOIN challenges ch ON ch.is_active = 1
WHERE c.email = 'ana@trainforge.local'
LIMIT 1;

INSERT INTO workouts (user_id, challenge_id, title, modality, duration_minutes, calories, points, completed_at)
SELECT c.id, ch.id, 'Treino de Cardio', 'Cycling', 40, 310, 16, NOW()
FROM users c
JOIN challenges ch ON ch.is_active = 1
WHERE c.email = 'bruno@trainforge.local'
LIMIT 1;

INSERT INTO service_requests (user_id, service_id, notes, status)
SELECT u.id, sc.id, 'Preciso de plano para perda de gordura com 4 dias por semana.', 'pending'
FROM users u
JOIN service_catalog sc ON sc.name = 'Plano Online'
WHERE u.email = 'ana@trainforge.local'
LIMIT 1;

INSERT INTO feedback (user_id, subject, message, rating)
SELECT u.id, 'Feedback da semana', 'Consegui manter consistencia e melhorar resistencia.', 5
FROM users u
WHERE u.email = 'ana@trainforge.local'
LIMIT 1;
