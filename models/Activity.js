const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    activityId: { type: Number, required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
    platform: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
