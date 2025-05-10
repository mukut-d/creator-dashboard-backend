const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  earnCredits,
  getAllUserCredits,
  getCredits,
  updateUserCredits,
} = require("../controller/creditController");

// user credits routes
router.post("/credits/earn", authMiddleware, earnCredits);
router.get("/credits", authMiddleware, getCredits);

// admin routes
router.post("/admin/credits/:userId", authMiddleware, updateUserCredits);
router.get("/admin/credits", authMiddleware, getAllUserCredits);

module.exports = router;
