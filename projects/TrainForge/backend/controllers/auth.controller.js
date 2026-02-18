const crypto = require('crypto');

const {
  sanitizeUser,
  findByEmail,
  findById,
  createUser
} = require('../models/user.model');
const {
  createSession,
  findSession,
  rotateSession,
  revokeSession,
  revokeAllSessions
} = require('../models/session.model');
const { hashPassword, comparePassword } = require('../utils/password');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  refreshConfig
} = require('../utils/jwt');

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function sessionExpiryDate() {
  const days = refreshConfig().expiresInDays;
  const dt = new Date();
  dt.setDate(dt.getDate() + days);
  return dt;
}

async function register(req, res, next) {
  try {
    const {
      fullName,
      email,
      password,
      birthDate,
      address,
      paymentInfo,
      mode
    } = req.body;

    if (!fullName || !email || !password) {
      return next({ status: 400, message: 'fullName, email and password are required.' });
    }

    const existing = await findByEmail(email.toLowerCase());
    if (existing) {
      return next({ status: 409, message: 'Email already registered.' });
    }

    const password_hash = await hashPassword(password);
    const created = await createUser({
      full_name: fullName,
      email: email.toLowerCase(),
      password_hash,
      role: 'client',
      birth_date: birthDate || null,
      address: address || null,
      payment_info: paymentInfo || null,
      mode: mode || 'online'
    });

    return res.status(201).json({ ok: true, data: sanitizeUser(created) });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({ status: 400, message: 'Email and password are required.' });
    }

    const user = await findByEmail(String(email).toLowerCase());
    if (!user) {
      return next({ status: 401, message: 'Invalid credentials.' });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return next({ status: 401, message: 'Invalid credentials.' });
    }

    if (Number(user.is_active) !== 1) {
      return next({ status: 403, message: 'User is disabled.' });
    }

    const sessionToken = crypto.randomUUID();
    const refreshToken = signRefreshToken(user, sessionToken);
    const accessToken = signAccessToken(user, sessionToken);
    const refreshTokenHash = hashToken(refreshToken);

    await createSession({
      sessionToken,
      userId: user.id,
      refreshTokenHash,
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip,
      expiresAt: sessionExpiryDate()
    });

    return res.json({
      ok: true,
      user: sanitizeUser(user),
      accessToken,
      refreshToken
    });
  } catch (err) {
    return next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next({ status: 400, message: 'refreshToken is required.' });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return next({ status: 401, message: 'Invalid refresh token.' });
    }

    const session = await findSession(payload.sid);
    if (!session || session.revoked_at) {
      return next({ status: 401, message: 'Session not available.' });
    }

    const incomingHash = hashToken(refreshToken);
    if (incomingHash !== session.refresh_token_hash) {
      await revokeSession(payload.sid);
      return next({ status: 401, message: 'Refresh token mismatch.' });
    }

    if (new Date(session.expires_at).getTime() < Date.now()) {
      await revokeSession(payload.sid);
      return next({ status: 401, message: 'Session expired.' });
    }

    const user = await findById(payload.sub);
    if (!user) {
      return next({ status: 401, message: 'User not found.' });
    }

    const nextRefreshToken = signRefreshToken(user, payload.sid);
    const nextAccessToken = signAccessToken(user, payload.sid);
    await rotateSession(payload.sid, hashToken(nextRefreshToken), sessionExpiryDate());

    return res.json({
      ok: true,
      user: sanitizeUser(user),
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken
    });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await findById(req.user.sub);
    return res.json({ ok: true, data: sanitizeUser(user) });
  } catch (err) {
    return next(err);
  }
}

async function logout(req, res, next) {
  try {
    const sessionToken = req.user?.sid || req.body?.sessionToken;
    if (!sessionToken) {
      return next({ status: 400, message: 'sessionToken not provided.' });
    }

    await revokeSession(sessionToken);
    return res.json({ ok: true, data: { revoked: true } });
  } catch (err) {
    return next(err);
  }
}

async function logoutAll(req, res, next) {
  try {
    await revokeAllSessions(req.user.sub);
    return res.json({ ok: true, data: { revoked_all: true } });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  register,
  login,
  refresh,
  me,
  logout,
  logoutAll
};
