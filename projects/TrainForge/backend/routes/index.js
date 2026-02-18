const express = require('express');

const { health } = require('../controllers/health.controller');
const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');
const challengeRoutes = require('./challenges.routes');
const workoutRoutes = require('./workouts.routes');
const serviceRoutes = require('./services.routes');
const feedbackRoutes = require('./feedback.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

router.get('/health', health);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/challenges', challengeRoutes);
router.use('/workouts', workoutRoutes);
router.use('/services', serviceRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
