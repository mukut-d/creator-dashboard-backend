const ActivityLog = require("../models/Activity");

const logActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { action, details, platform } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    const activityId = Date.now();
    const activity = new ActivityLog({
      activityId,
      userId,
      action,
      details,
      platform,
    });

    // console.log(JSON.stringify(activity, null, 2));
    await activity.save();
    res.status(201).json({ message: "Activity logged", ok: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to log activity", error: err.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const activities = await ActivityLog.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ ok: true, activities });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch activities", error: err.message });
  }
};

module.exports = {
  logActivity,
  getActivity,
};
