class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.clients = new Map();
    }

    allow(clientId) {
        const now = Date.now();

        if (!this.clients.has(clientId)) {
            this.clients.set(clientId, []);
        }

        const requests = this.clients.get(clientId);
        

        while (requests.length > 0 && now - requests[0] >= this.windowMs) {
            requests.shift();
        }

        if (requests.length < this.limit) {
            requests.push(now);
            

            return {
                allowed: true,
                remaining: this.limit - requests.length,
                retryAfter: 0
            };
        }

        return {
            allowed: false,
            remaining: 0,
            retryAfter: Math.ceil((this.windowMs - (now - requests[0])) / 1000)
        };
    }
}

module.exports = RateLimiter;