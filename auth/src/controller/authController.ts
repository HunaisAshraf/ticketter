import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const getUser = async (req: Request, res: Response) => {
  try {
    res.send("hello user");
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password");
    }

    const { email, password } = req.body;

    return res.status(200).send({ success: true, email, password });
  } catch (error) {
    next(error);
  }
};
