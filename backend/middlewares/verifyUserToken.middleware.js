

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.auth;

  if (!token) {
    return res.status(401).json({
      message: 'access denied',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Expired token',
    });
  }
};

