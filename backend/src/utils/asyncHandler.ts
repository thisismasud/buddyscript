import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "AppError"; 
  }
}

//forwarding error to Express middleware
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("Async error:", err); 
      next(err); 
    });
  };
};