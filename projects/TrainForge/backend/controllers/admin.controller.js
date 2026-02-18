const { overview } = require('../models/admin.model');
const { leaderboard } = require('../models/workout.model');

async function getOverview(_req, res, next) {
  try {
    const data = await overview();
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function getRankings(_req, res, next) {
  try {
    const data = await leaderboard(20);
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getOverview, getRankings };
