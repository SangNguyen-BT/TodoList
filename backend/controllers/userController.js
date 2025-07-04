import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import dotenv from "dotenv"

import UserModel from "../models/User.js";

// dotenv.config()

export async function register(req, res) {
  try {
    let { name, email, password } = req.body;

    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password)
      return res.status(401).json("Require name, email, password");

    const existedUser = await UserModel.findOne({ email });
    if (existedUser) return res.status(400).json("Email already existed");

    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hash,
    });

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json({user: userResponse});

  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json("Invalid Email or Password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid Password");

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(201).json({
      token,
      name: user.name,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

export async function changeUserPassword(req, res) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json("Invalid account");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json("Old Password not correct");

    if (newPassword !== confirmPassword)
      return res.status(400).json("Confirm password not match");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Change password successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedUser) return res.status(400).json("Invalid Account");

    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getUserInfo(req, res) {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(400).json("User not found");

    res.json(user);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const resetToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset email sent successfully.",
      token: resetToken,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) return res.status(400).json("User not found");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json("Password reset successfully!");
  } catch (error) {
    res.status(400).json("Invalid or expired token.");
  }
}
