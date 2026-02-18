const { query } = require('../utils/db');

async function createSession({ sessionToken, userId, refreshTokenHash, userAgent, ipAddress, expiresAt }) {
  await query(
    `INSERT INTO sessions (session_token, user_id, refresh_token_hash, user_agent, ip_address, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sessionToken, userId, refreshTokenHash, userAgent || null, ipAddress || null, expiresAt]
  );
}

async function findSession(sessionToken) {
  const rows = await query(
    `SELECT * FROM sessions
     WHERE session_token = ?
     LIMIT 1`,
    [sessionToken]
  );
  return rows[0] || null;
}

async function rotateSession(sessionToken, refreshTokenHash, expiresAt) {
  await query(
    `UPDATE sessions
     SET refresh_token_hash = ?, expires_at = ?, revoked_at = NULL
     WHERE session_token = ?`,
    [refreshTokenHash, expiresAt, sessionToken]
  );
}

async function revokeSession(sessionToken) {
  await query('UPDATE sessions SET revoked_at = NOW() WHERE session_token = ?', [sessionToken]);
}

async function revokeAllSessions(userId) {
  await query('UPDATE sessions SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL', [userId]);
}

module.exports = {
  createSession,
  findSession,
  rotateSession,
  revokeSession,
  revokeAllSessions
};
