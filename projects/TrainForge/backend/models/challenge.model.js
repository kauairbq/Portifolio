const { query } = require('../utils/db');

async function listChallenges() {
  return query(
    `SELECT c.*, u.full_name AS created_by_name
     FROM challenges c
     LEFT JOIN users u ON u.id = c.created_by
     ORDER BY c.created_at DESC`
  );
}

async function createChallenge(payload) {
  const result = await query(
    `INSERT INTO challenges
      (title, description, modality, weekly_target, points_per_completion, is_active, starts_at, ends_at, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.title,
      payload.description || null,
      payload.modality || 'General',
      payload.weekly_target || 5,
      payload.points_per_completion || 10,
      payload.is_active ?? 1,
      payload.starts_at,
      payload.ends_at,
      payload.created_by
    ]
  );

  const rows = await query('SELECT * FROM challenges WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function toggleChallenge(id, isActive) {
  await query('UPDATE challenges SET is_active = ? WHERE id = ?', [isActive ? 1 : 0, id]);
  const rows = await query('SELECT * FROM challenges WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function rankingByChallenge(challengeId, top = 3) {
  return query(
    `SELECT u.id, u.full_name, u.mode, COALESCE(SUM(cs.points), 0) AS total_points
     FROM challenge_scores cs
     JOIN users u ON u.id = cs.user_id
     WHERE cs.challenge_id = ?
     GROUP BY u.id, u.full_name, u.mode
     ORDER BY total_points DESC, u.full_name ASC
     LIMIT ?`,
    [challengeId, top]
  );
}

module.exports = {
  listChallenges,
  createChallenge,
  toggleChallenge,
  rankingByChallenge
};
