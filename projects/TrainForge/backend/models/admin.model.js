const { query } = require('../utils/db');

async function overview() {
  const users = await query('SELECT role, COUNT(*) AS total FROM users GROUP BY role');
  const activeRows = await query('SELECT COUNT(*) AS total FROM challenges WHERE is_active = 1');
  const pendingRows = await query("SELECT COUNT(*) AS total FROM service_requests WHERE status IN ('pending','approved','in_progress')");
  const ticketsRows = await query("SELECT COUNT(*) AS total FROM support_tickets WHERE status IN ('open','in_progress')");

  const activeChallenge = activeRows[0];
  const pendingRequests = pendingRows[0];
  const openTickets = ticketsRows[0];

  return {
    users_by_role: users,
    active_challenges: activeChallenge ? activeChallenge.total : 0,
    pending_requests: pendingRequests ? pendingRequests.total : 0,
    open_tickets: openTickets ? openTickets.total : 0
  };
}

module.exports = { overview };
