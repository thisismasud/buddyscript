import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model";
import { AppError, asyncHandler } from "../utils/asyncHandler";
import { hashPassword } from "../utils/hashPassword";
import { sanitizeEmail, sanitizeString } from "../utils/sanitizers";

export const UserController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const firstName = sanitizeString(req.body.firstName);
    const lastName = sanitizeString(req.body.lastName);
    const email = sanitizeEmail(req.body.email);
    const password = sanitizeString(req.body.password);

    if (!firstName || !email || !password) {
      throw new AppError(400, "All Fields are required!");
    }

    //email exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      throw new AppError(400, "Email already in use!");
    }

    //hashed password
    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account registered successfully",
      data: user,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const email = sanitizeEmail(req.body.email);
    const password = sanitizeString(req.body.password);
    if (!email || !password) {
      throw new AppError(400, "All fields are required");
    }

    const user = await UserModel.findOne({ email });
    if (!user) throw new AppError(400, "Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new AppError(400, "Invalid email or password");

    const userObject = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatarUrl || null,
    };

    const token = jwt.sign(userObject, process.env.JWT_SECRET as string, {
      expiresIn: "30m",
    });
    const COOKIE_NAME = process.env.COOKIE_NAME;

    res.cookie(COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login success",
      data: userObject,
    });
  }),
};
