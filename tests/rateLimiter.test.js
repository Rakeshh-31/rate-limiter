const RateLimiter = require("../services/RateLimiter");

const limiter = new RateLimiter(5, 10000);

console.log("========== TEST 1 ==========");
console.log("Allowed under limit");

for (let i = 1; i <= 5; i++) {
    console.log(`Request ${i}:`, limiter.allow("alice"));
}

console.log("\n========== TEST 2 ==========");
console.log("Blocked over limit");

console.log("Request 6:", limiter.allow("alice"));

console.log("\n========== TEST 3 ==========");
console.log("Different client");

console.log("Bob Request:", limiter.allow("bob"));

console.log("\n========== TEST 4 ==========");
console.log("Window Reset");

setTimeout(() => {
    console.log("Alice after 10 seconds:");
    console.log(limiter.allow("alice"));
}, 10000);