const express = require('express');
const { getOverview, getRankings } = require('../controllers/admin.controller');
const { authRequired } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authRequired, allowRoles('admin', 'trainer'));

router.get('/overview', getOverview);
router.get('/rankings', getRankings);

module.exports = router;
