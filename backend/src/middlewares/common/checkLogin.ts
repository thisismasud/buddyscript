// middleware/checkLogin.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/asyncHandler";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const COOKIE_NAME = process.env.COOKIE_NAME!; 

  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    throw new AppError(401, "You are not logged in! Please log in to continue.");
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new AppError(500, "Server misconfiguration: JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded.userId) {
      throw new AppError(401, "Invalid token payload");
    }
    (req as any).user = decoded;
    next();

  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError(401, "Session Expired. Please log in again.");
    }
    if (err.name === 'JsonWebTokenError') {
      throw new AppError(401, "Invalid authentication. Please log in again.");
    }
    throw new AppError(401, "Authentication failed.");
  }
};

export default checkLogin;