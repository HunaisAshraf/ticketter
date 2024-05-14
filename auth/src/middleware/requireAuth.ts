import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session?.jwt) {
      return res.status(401).send({ message: "user not authorised" });
    }
  } catch (error) {
    console.log(error);
    res.send({ currentUser: null });
  }
  next();
};
