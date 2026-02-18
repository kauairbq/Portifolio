const { query } = require('../utils/db');

async function createSupportTicket(payload) {
  const result = await query(
    `INSERT INTO support_tickets (user_id, subject, message, status)
     VALUES (?, ?, ?, 'open')`,
    [payload.user_id, payload.subject, payload.message]
  );

  const rows = await query('SELECT * FROM support_tickets WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function listSupportTickets(user) {
  const isManager = user.role === 'admin' || user.role === 'trainer';
  return query(
    isManager
      ? `SELECT st.*, u.full_name, u.email
         FROM support_tickets st
         JOIN users u ON u.id = st.user_id
         ORDER BY st.created_at DESC`
      : `SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC`,
    isManager ? [] : [user.id]
  );
}

module.exports = { createSupportTicket, listSupportTickets };
