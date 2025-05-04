const mongoose = require("mongoose");

const savePostsSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    postId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    saved: { type: Boolean, enum: ["user", "admin"], required: true },
    platform: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedPosts", savePostsSchema);
