const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const {
  earnCredits,
  getAllUserCredits,
  getCredits,
  updateUserCredits,
} = require("../controller/creditController");

// user credits routes
router.post("/credits/earn", auth, earnCredits);
router.get("/credits", auth, getCredits);

// admin routes
router.post("/admin/credits/:userId", auth, updateUserCredits);
router.get("/admin/credits", auth, getAllUserCredits);

module.exports = router;
