import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { AppError } from "../../utils/asyncHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof MulterError) {
    let message = "File upload error";
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File too large. Max 5MB allowed.";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Too many files uploaded.";
    }
    return res.status(400).json({ success: false, message });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
