const {
  listChallenges,
  createChallenge,
  toggleChallenge,
  rankingByChallenge
} = require('../models/challenge.model');
const { createWorkout } = require('../models/workout.model');

async function getChallenges(req, res, next) {
  try {
    const challenges = await listChallenges();
    return res.json({ ok: true, data: challenges });
  } catch (err) {
    return next(err);
  }
}

async function postChallenge(req, res, next) {
  try {
    const { title, description, modality, weeklyTarget, pointsPerCompletion, startsAt, endsAt, isActive } = req.body;
    if (!title || !startsAt || !endsAt) {
      return next({ status: 400, message: 'title, startsAt and endsAt are required.' });
    }

    const challenge = await createChallenge({
      title,
      description,
      modality,
      weekly_target: Number(weeklyTarget || 5),
      points_per_completion: Number(pointsPerCompletion || 10),
      starts_at: startsAt,
      ends_at: endsAt,
      is_active: isActive ?? 1,
      created_by: req.user.sub
    });

    return res.status(201).json({ ok: true, data: challenge });
  } catch (err) {
    return next(err);
  }
}

async function patchChallengeToggle(req, res, next) {
  try {
    const id = Number(req.params.id);
    const isActive = Number(req.body.isActive) === 1 || req.body.isActive === true;
    const challenge = await toggleChallenge(id, isActive);
    return res.json({ ok: true, data: challenge });
  } catch (err) {
    return next(err);
  }
}

async function getChallengeRanking(req, res, next) {
  try {
    const id = Number(req.params.id);
    const top = Math.max(1, Math.min(10, Number(req.query.top || 3)));
    const ranking = await rankingByChallenge(id, top);
    return res.json({ ok: true, data: ranking });
  } catch (err) {
    return next(err);
  }
}

async function postChallengeComplete(req, res, next) {
  try {
    const challengeId = Number(req.params.id);
    const { title, modality, durationMinutes, calories, points } = req.body;

    const workout = await createWorkout({
      user_id: req.user.sub,
      challenge_id: challengeId,
      title: title || 'Challenge completion',
      modality: modality || 'General',
      duration_minutes: Number(durationMinutes || 30),
      calories: Number(calories || 0),
      points: Number(points || 10),
      completed_at: new Date()
    });

    return res.status(201).json({ ok: true, data: workout });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getChallenges,
  postChallenge,
  patchChallengeToggle,
  getChallengeRanking,
  postChallengeComplete
};
