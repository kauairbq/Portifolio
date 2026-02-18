const { query } = require('../utils/db');

async function createWorkout(payload) {
  const result = await query(
    `INSERT INTO workouts
      (user_id, challenge_id, title, modality, duration_minutes, calories, points, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.user_id,
      payload.challenge_id || null,
      payload.title,
      payload.modality || 'General',
      payload.duration_minutes || 0,
      payload.calories || 0,
      payload.points || 0,
      payload.completed_at || new Date()
    ]
  );

  if (payload.challenge_id) {
    await query(
      `INSERT INTO challenge_scores (challenge_id, user_id, workout_id, points, score_date)
       VALUES (?, ?, ?, ?, CURDATE())`,
      [payload.challenge_id, payload.user_id, result.insertId, payload.points || 0]
    );
  }

  const rows = await query('SELECT * FROM workouts WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function leaderboard(limit = 10) {
  return query(
    `SELECT u.id, u.full_name, u.mode, COALESCE(SUM(w.points), 0) AS total_points,
            COUNT(w.id) AS total_workouts
     FROM users u
     LEFT JOIN workouts w ON w.user_id = u.id
     WHERE u.role = 'client'
     GROUP BY u.id, u.full_name, u.mode
     ORDER BY total_points DESC, total_workouts DESC
     LIMIT ?`,
    [limit]
  );
}

async function metrics(userId) {
  const whereClause = userId ? 'WHERE w.user_id = ?' : '';
  const params = userId ? [userId] : [];

  const rows = await query(
    `SELECT COUNT(*) AS total_workouts,
            COALESCE(SUM(w.points), 0) AS total_points,
            COALESCE(AVG(w.duration_minutes), 0) AS avg_duration,
            COALESCE(SUM(w.calories), 0) AS total_calories
     FROM workouts w
     ${whereClause}`,
    params
  );

  return rows[0] || { total_workouts: 0, total_points: 0, avg_duration: 0, total_calories: 0 };
}

async function historyByUser(userId) {
  return query(
    `SELECT w.id, w.title, w.modality, w.duration_minutes, w.calories, w.points, w.completed_at,
            c.title AS challenge_title
     FROM workouts w
     LEFT JOIN challenges c ON c.id = w.challenge_id
     WHERE w.user_id = ?
     ORDER BY w.completed_at DESC
     LIMIT 100`,
    [userId]
  );
}

module.exports = {
  createWorkout,
  leaderboard,
  metrics,
  historyByUser
};
