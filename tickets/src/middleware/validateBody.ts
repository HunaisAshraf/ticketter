import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error(`Invalid details ${errors.array()}`);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
