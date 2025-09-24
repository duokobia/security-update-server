/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string | number | undefined = process.env.JWT_EXPIRES_IN || "1h";

export const handleLoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Optional: Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT payload
    const payload = {
      userId: user._id,
      role: user.role,
    };

    // Sign JWT token
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] };
const token = jwt.sign(payload, JWT_SECRET, options);

    // Return safe user data + token
    const { password: _, ...safeUser } = user.toObject();
    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Failed to login.", error: err });
  }
};

export const handleCreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Don't send password back
    const { password: _, ...safeUser } = newUser.toObject();
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to create user.", error: err });
  }
};

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

export const handleGetUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
};
