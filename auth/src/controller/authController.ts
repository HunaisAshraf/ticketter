import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";
import bcryptjs from "bcryptjs";

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    res.send(users);
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

    const { name, email, phone, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};
