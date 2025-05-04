const User = require("../models/User");

const earnCredits = async (req, res) => {
  const userId = req.user._id;
  const { action } = req.body;

  const creditMap = {
    login: 10,
    complete_profile: 20,
    feed_interaction: 5,
  };

  if (!creditMap[action]) {
    return res.status(400).json({ message: "Inavlid action" });
  }

  try {
    const user = await User.findById(userId);
    user.credits += creditMap[action];

    await user.save();

    res.status(200).json({
      message: `Earned ${creditMap[action]} credits`,
      credits: user.credits,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating credits", error: err.message });
  }
};

const getCredits = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("credits");
    res.status(200).json({ credits: user.credits, userId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch credits", error: err.message });
  }
};

const getAllUserCredits = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const adminId = req.user._id;
    const users = await User.find().select("username email credits");
    res.status(200).json({ adminId, users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

const updateUserCredits = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { userId } = req.params;
  const { credits } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { credits },
      { new: true }
    ).select("username credits");
    res.status(200).json({ message: "User credits updated", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update credits", error: err.message });
  }
};

module.exports = {
  earnCredits,
  getAllUserCredits,
  getCredits,
  updateUserCredits,
};
