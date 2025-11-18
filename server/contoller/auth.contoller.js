import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isRegister = await User.findOne({ email });

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all input" });
    }
    if (isRegister) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      success: true,
      message: "Account successfully created",
      newUser: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from create account",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all input" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is not correct" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Inter server error from Login" });
  }
};
