const {
  listCatalog,
  createCatalogItem,
  toggleCatalogItem,
  createServiceRequest,
  listServiceRequests,
  updateServiceRequestStatus,
  createQuote,
  listQuotes
} = require('../models/service.model');
const { sendMail } = require('../utils/mailer');

async function getCatalog(req, res, next) {
  try {
    const activeOnly = req.query.activeOnly !== 'false';
    const data = await listCatalog(activeOnly);
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function postCatalog(req, res, next) {
  try {
    const { name, description, isActive } = req.body;
    if (!name) {
      return next({ status: 400, message: 'name is required.' });
    }

    const data = await createCatalogItem({
      name,
      description,
      is_active: isActive ?? 1,
      created_by: req.user.sub
    });

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function patchCatalogToggle(req, res, next) {
  try {
    const data = await toggleCatalogItem(Number(req.params.id), req.body.isActive);
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function postRequest(req, res, next) {
  try {
    const { serviceId, notes } = req.body;
    if (!serviceId) {
      return next({ status: 400, message: 'serviceId is required.' });
    }

    const data = await createServiceRequest({
      user_id: req.user.sub,
      service_id: Number(serviceId),
      notes
    });

    await sendMail({
      subject: 'TrainForge - New service request',
      text: `${req.user.fullName} submitted a new request for ${data.service_name}.`
    });

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function getRequests(req, res, next) {
  try {
    const data = await listServiceRequests({ id: req.user.sub, role: req.user.role });
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function patchRequestStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      return next({ status: 400, message: 'status is required.' });
    }

    const data = await updateServiceRequestStatus(Number(req.params.id), status);
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function postQuote(req, res, next) {
  try {
    const { userId, serviceRequestId, budgetEstimate, notes } = req.body;
    if (!userId) {
      return next({ status: 400, message: 'userId is required.' });
    }

    const data = await createQuote({
      user_id: Number(userId),
      service_request_id: serviceRequestId ? Number(serviceRequestId) : null,
      budget_estimate: budgetEstimate ?? null,
      notes: notes || null
    });

    return res.status(201).json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function getQuotes(req, res, next) {
  try {
    const data = await listQuotes({ id: req.user.sub, role: req.user.role });
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCatalog,
  postCatalog,
  patchCatalogToggle,
  postRequest,
  getRequests,
  patchRequestStatus,
  postQuote,
  getQuotes
};
