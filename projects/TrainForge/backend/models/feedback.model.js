const { query } = require('../utils/db');

async function createFeedback(payload) {
  const result = await query(
    `INSERT INTO feedback (user_id, subject, message, rating)
     VALUES (?, ?, ?, ?)`,
    [payload.user_id, payload.subject, payload.message, payload.rating || 5]
  );

  const rows = await query('SELECT * FROM feedback WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function listFeedback(limit = 100) {
  return query(
    `SELECT f.*, u.full_name, u.email
     FROM feedback f
     JOIN users u ON u.id = f.user_id
     ORDER BY f.created_at DESC
     LIMIT ?`,
    [limit]
  );
}

module.exports = { createFeedback, listFeedback };
