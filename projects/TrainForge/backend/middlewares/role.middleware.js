function allowRoles(...roles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next({ status: 401, message: 'Unauthorized.' });
    }

    if (!roles.includes(req.user.role)) {
      return next({ status: 403, message: 'Insufficient permissions.' });
    }

    return next();
  };
}

module.exports = { allowRoles };
