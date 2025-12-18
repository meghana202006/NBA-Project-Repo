const rateLimiter = require('express-rate-limit');

const loginLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message:"Too many login attempts, please try again later after 10 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;