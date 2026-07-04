const RateLimiter = require("../services/RateLimiter");

// Configure: 5 requests per 10 seconds
const limiter = new RateLimiter(5, 10000);

function rateLimiter(req, res, next) {
    const clientId = req.query.client;

    

    if (!clientId) {
        return res.status(400).json({
            message: "Client ID is required"
        });
    }

    const result = limiter.allow(clientId);
    

    if (result.allowed) {
        res.set("X-RateLimit-Remaining", result.remaining);
        next();
    } else {
        res.set("Retry-After", result.retryAfter);

        return res.status(429).json({
            message: "Too Many Requests",
            retryAfter: result.retryAfter
        });
    }
}

module.exports = rateLimiter;