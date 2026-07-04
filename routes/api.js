const express = require("express");
const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter");

// GET /api/request?client=alice
router.get("/request", rateLimiter, (req, res) => {
    res.status(200).json({
        message: "Request Allowed"
    });
});

module.exports = router;