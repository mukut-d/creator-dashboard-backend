const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 0 },
  role: { type: String, enum: ["user", "admin"], required: true },
});

module.exports = mongoose.model("User", userSchema);
