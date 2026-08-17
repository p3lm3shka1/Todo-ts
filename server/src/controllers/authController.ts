import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../models/User.js";

const ACCESS_TOKEN_MAX_AGE = 15 * 60;
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

const createAccessToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return jwt.sign({ userId }, secret, { expiresIn: ACCESS_TOKEN_MAX_AGE });
};

const createRefreshToken = (userId: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET");
  return jwt.sign({ userId }, secret, { expiresIn: REFRESH_TOKEN_MAX_AGE });
};

const setAuthCookies = (res: Response, userId: string) => {
  const accessToken = createAccessToken(userId);
  const refreshToken = createRefreshToken(userId);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ACCESS_TOKEN_MAX_AGE * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_MAX_AGE * 1000,
    path: "/api/auth/refresh",
  });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email, provide correct one" });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const emailToLow = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailToLow });

    if (existingUser) {
      return res.status(400).json({ error: "Try different email" });
    }

    const cryptedPass = await bcrypt.hash(password, 10);
    await User.create({ email: emailToLow, password: cryptedPass });

    return res.status(201).json({ message: "User created successfully" });
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

    setAuthCookies(res, user._id.toString());

    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const decoded = jwt.verify(token, secret) as { userId: string };

    const user = await User.findById(decoded.userId).select("_id");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    setAuthCookies(res, user._id.toString());

    return res.status(200).json({ message: "Refreshed" });
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const logout = (_req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", { ...cookieOptions, path: "/api/auth/refresh" });
  return res.status(200).json({ message: "Logged out" });
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json({ email: user.email });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
