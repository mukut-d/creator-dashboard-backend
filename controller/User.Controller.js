const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  );
};

const userSignup = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    const existing = await User.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: Date.now(),
      name,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err });
  }
};

const userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user)
      return res
        .status(400)
        .json({ message: "Login Failed, invalid name or password" });

    // console.log("user " + user);

    const isMatch = await bcrypt.compare(password, user.password);

    // console.log("isMatch " + isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = generateToken(user);

    // console.log("token " + token);

    res.status(200).json({
      message: "Login Successful",
      ok: true,
      _id: user._id,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      err: err,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
