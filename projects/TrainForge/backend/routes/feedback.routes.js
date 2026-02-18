const express = require('express');
const { postFeedback, getFeedback } = require('../controllers/feedback.controller');
const { authRequired } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authRequired);

router.post('/', postFeedback);
router.get('/', allowRoles('admin', 'trainer'), getFeedback);

module.exports = router;
