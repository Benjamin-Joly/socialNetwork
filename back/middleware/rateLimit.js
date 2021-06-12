const rateLimit = require('express-rate-limit');

exports.userLogLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 10
  });
exports.signupLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 5
  });

