const bcrypt = require("bcrypt");
const UserModel = require("../Models/user"); 
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists, you can login", success: false });
    }

    // create new user
    const newUser = new UserModel({
      name,
      email,
      password: await bcrypt.hash(password, 10), 
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed: email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // ✅ Fixed here
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // JWT token generate
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

module.exports = { signup, login };
