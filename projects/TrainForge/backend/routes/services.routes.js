const express = require('express');
const {
  getCatalog,
  postCatalog,
  patchCatalogToggle,
  postRequest,
  getRequests,
  patchRequestStatus,
  postQuote,
  getQuotes
} = require('../controllers/services.controller');
const { authRequired } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authRequired);

router.get('/catalog', getCatalog);
router.post('/catalog', allowRoles('admin', 'trainer'), postCatalog);
router.patch('/catalog/:id/toggle', allowRoles('admin', 'trainer'), patchCatalogToggle);

router.get('/requests', getRequests);
router.post('/requests', postRequest);
router.patch('/requests/:id/status', allowRoles('admin', 'trainer'), patchRequestStatus);

router.get('/quotes', getQuotes);
router.post('/quotes', allowRoles('admin', 'trainer'), postQuote);

module.exports = router;
