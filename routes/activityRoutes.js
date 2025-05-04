const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  logActivity,
  getActivity,
} = require("../controller/Activity.Controller");

const router = express.Router();

router.post("/saved", authMiddleware, logActivity);

router.get("/:id", authMiddleware, getActivity);

module.exports = router;
