import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Detect environment
const isProduction = process.env.NODE_ENV === 'production';

// Cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,              // only true in production (HTTPS)
  sameSite: isProduction ? "None" : "Lax", // allow cross-site cookies in prod
  maxAge: 24 * 60 * 60 * 1000        // 1 day
};

// ================== Register ==================
export async function registerUser(req, res) {
  const { username, password } = req.body;
  console.log(username);
  

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
      console.error("Register Error:", err);  // 👈 add this
      res.status(500).json({ message: "Server error", error: err.message });
  }
}

// ================== Login ==================
export async function loginUser(req, res) {
  const { username, password } = req.body;
  
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// ================== Me ==================
export async function me(req, res) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token", error: err.message });
  }
}
