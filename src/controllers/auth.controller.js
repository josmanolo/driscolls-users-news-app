const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordMatch = password
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { role: user.role, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = login;
