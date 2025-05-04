const express = require("express");
const { userSignup, userLogin } = require("../controller/User.Controller");

const router = express.Router();

router.post("/register", userSignup);

// Login
router.post("/login", userLogin);

module.exports = router;
