const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const { verifyToken } = require("../middleware/jwt/token");

router.post("/register", authControllers.controllers.postRegister);

router.post("/login", authControllers.controllers.postLogin);

// Test route to verify middleware
router.get("/test", verifyToken, (req, res) => {
  res.send("request Passed");
});
module.exports = router;
