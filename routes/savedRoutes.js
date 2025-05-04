const express = require("express");

const { savePosts, getPosts } = require("../controller/Saved.Controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/saved", authMiddleware, savePosts);

router.get("/:id", authMiddleware, getPosts);

module.exports = router;
