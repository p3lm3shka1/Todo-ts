import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../models/User.js";

const createToken = (userId: string) => {
  const maxAge = 3 * 24 * 60 * 60;
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Something went wrong with JWT secret");
  }
  return jwt.sign({ userId }, secret, { expiresIn: maxAge });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Invalid email, provide correct one" });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const emailToLow = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailToLow });

    if (existingUser) {
      return res.status(400).json({ error: "Try different email" });
    }
    const cryptedPass = await bcrypt.hash(password, 10);

    await User.create({
      email: emailToLow,
      password: cryptedPass,
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const emailToLow = email.toLowerCase();
    const user = await User.findOne({ email: emailToLow });
    if (!user) {
      return res.status(400).json({ error: "Oops! Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Oops! Invalid email or password" });
    }
    const token = createToken(user._id.toString());
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
