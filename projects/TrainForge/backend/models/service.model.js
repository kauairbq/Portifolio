const { query } = require('../utils/db');

async function listCatalog(activeOnly = false) {
  if (activeOnly) {
    return query(
      `SELECT sc.*, u.full_name AS created_by_name
       FROM service_catalog sc
       LEFT JOIN users u ON u.id = sc.created_by
       WHERE sc.is_active = 1
       ORDER BY sc.created_at DESC`
    );
  }

  return query(
    `SELECT sc.*, u.full_name AS created_by_name
     FROM service_catalog sc
     LEFT JOIN users u ON u.id = sc.created_by
     ORDER BY sc.created_at DESC`
  );
}

async function createCatalogItem(payload) {
  const result = await query(
    `INSERT INTO service_catalog (name, description, is_active, created_by)
     VALUES (?, ?, ?, ?)`,
    [payload.name, payload.description || null, payload.is_active ?? 1, payload.created_by]
  );

  const rows = await query('SELECT * FROM service_catalog WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function toggleCatalogItem(id, isActive) {
  await query('UPDATE service_catalog SET is_active = ? WHERE id = ?', [isActive ? 1 : 0, id]);
  const rows = await query('SELECT * FROM service_catalog WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createServiceRequest(payload) {
  const result = await query(
    `INSERT INTO service_requests (user_id, service_id, notes, status)
     VALUES (?, ?, ?, 'pending')`,
    [payload.user_id, payload.service_id, payload.notes || null]
  );

  const rows = await query(
    `SELECT sr.*, sc.name AS service_name
     FROM service_requests sr
     JOIN service_catalog sc ON sc.id = sr.service_id
     WHERE sr.id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0] || null;
}

async function listServiceRequests(user) {
  const isManager = user.role === 'admin' || user.role === 'trainer';
  const rows = await query(
    isManager
      ? `SELECT sr.*, sc.name AS service_name, u.full_name AS client_name
         FROM service_requests sr
         JOIN service_catalog sc ON sc.id = sr.service_id
         JOIN users u ON u.id = sr.user_id
         ORDER BY sr.created_at DESC`
      : `SELECT sr.*, sc.name AS service_name
         FROM service_requests sr
         JOIN service_catalog sc ON sc.id = sr.service_id
         WHERE sr.user_id = ?
         ORDER BY sr.created_at DESC`,
    isManager ? [] : [user.id]
  );

  return rows;
}

async function updateServiceRequestStatus(id, status) {
  await query('UPDATE service_requests SET status = ? WHERE id = ?', [status, id]);
  const rows = await query('SELECT * FROM service_requests WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function createQuote(payload) {
  const result = await query(
    `INSERT INTO quote_requests (user_id, service_request_id, budget_estimate, notes, status)
     VALUES (?, ?, ?, ?, 'sent')`,
    [payload.user_id, payload.service_request_id || null, payload.budget_estimate || null, payload.notes || null]
  );

  const rows = await query('SELECT * FROM quote_requests WHERE id = ? LIMIT 1', [result.insertId]);
  return rows[0] || null;
}

async function listQuotes(user) {
  const isManager = user.role === 'admin' || user.role === 'trainer';
  return query(
    isManager
      ? `SELECT q.*, u.full_name AS client_name
         FROM quote_requests q
         JOIN users u ON u.id = q.user_id
         ORDER BY q.created_at DESC`
      : `SELECT * FROM quote_requests WHERE user_id = ? ORDER BY created_at DESC`,
    isManager ? [] : [user.id]
  );
}

module.exports = {
  listCatalog,
  createCatalogItem,
  toggleCatalogItem,
  createServiceRequest,
  listServiceRequests,
  updateServiceRequestStatus,
  createQuote,
  listQuotes
};
