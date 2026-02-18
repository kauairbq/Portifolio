const { query } = require('../utils/db');

function sanitizeUser(user) {
  if (!user) return null;
  let paymentInfo = user.payment_info;
  if (typeof paymentInfo === 'string') {
    try {
      paymentInfo = JSON.parse(paymentInfo);
    } catch {
      // keep raw string
    }
  }

  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    birth_date: user.birth_date,
    address: user.address,
    payment_info: paymentInfo,
    mode: user.mode,
    is_active: Number(user.is_active) === 1,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
}

async function findByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

async function findById(id) {
  const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createUser(payload) {
  const sql = `
    INSERT INTO users (full_name, email, password_hash, role, birth_date, address, payment_info, mode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const paymentInfo = payload.payment_info ? JSON.stringify(payload.payment_info) : null;

  const result = await query(sql, [
    payload.full_name,
    payload.email,
    payload.password_hash,
    payload.role || 'client',
    payload.birth_date || null,
    payload.address || null,
    paymentInfo,
    payload.mode || 'online'
  ]);

  return findById(result.insertId);
}

async function listUsers(role) {
  const sql = role
    ? 'SELECT id, full_name, email, role, birth_date, address, mode, is_active, created_at FROM users WHERE role = ? ORDER BY created_at DESC'
    : 'SELECT id, full_name, email, role, birth_date, address, mode, is_active, created_at FROM users ORDER BY created_at DESC';

  return role ? query(sql, [role]) : query(sql);
}

async function updateOwnProfile(userId, payload) {
  const current = await findById(userId);
  if (!current) return null;

  const next = {
    full_name: payload.full_name ?? current.full_name,
    birth_date: payload.birth_date ?? current.birth_date,
    address: payload.address ?? current.address,
    payment_info: payload.payment_info ?? current.payment_info,
    mode: payload.mode ?? current.mode
  };

  let paymentInfo = null;
  if (next.payment_info !== undefined && next.payment_info !== null && next.payment_info !== '') {
    if (typeof next.payment_info === 'string') {
      try {
        paymentInfo = JSON.stringify(JSON.parse(next.payment_info));
      } catch {
        paymentInfo = JSON.stringify({ value: next.payment_info });
      }
    } else {
      paymentInfo = JSON.stringify(next.payment_info);
    }
  }

  await query(
    `UPDATE users
     SET full_name = ?, birth_date = ?, address = ?, payment_info = ?, mode = ?
     WHERE id = ?`,
    [next.full_name, next.birth_date, next.address, paymentInfo, next.mode, userId]
  );

  return findById(userId);
}

async function getUserHistory(userId) {
  const [workouts, requests, tickets, feedback] = await Promise.all([
    query(
      `SELECT w.id, w.title, w.modality, w.duration_minutes, w.points, w.completed_at,
              c.title AS challenge_title
       FROM workouts w
       LEFT JOIN challenges c ON c.id = w.challenge_id
       WHERE w.user_id = ?
       ORDER BY w.completed_at DESC
       LIMIT 30`,
      [userId]
    ),
    query(
      `SELECT sr.id, sr.status, sr.notes, sr.created_at, sc.name AS service_name
       FROM service_requests sr
       JOIN service_catalog sc ON sc.id = sr.service_id
       WHERE sr.user_id = ?
       ORDER BY sr.created_at DESC
       LIMIT 30`,
      [userId]
    ),
    query(
      `SELECT id, subject, message, status, created_at
       FROM support_tickets
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 30`,
      [userId]
    ),
    query(
      `SELECT id, subject, rating, created_at
       FROM feedback
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 20`,
      [userId]
    )
  ]);

  return { workouts, requests, tickets, feedback };
}

module.exports = {
  sanitizeUser,
  findByEmail,
  findById,
  createUser,
  listUsers,
  updateOwnProfile,
  getUserHistory
};
