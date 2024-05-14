import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req: Request, res: Response) => {
  try {
    if (!req.session?.jwt) {
      return res.send({ currentUser: null });
    }

    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.send({ currentUser: payload });
  } catch (error) {
    console.log(error);
    res.send({ currentUser: null });
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
      throw new Error(`Invalid email or password`);
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

    const userJwt = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      throw new Error(`Invalid email or password ${errors.array()}`);
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("user dosent exist");
    }

    const passwordMatched = await bcryptjs.compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("password dosent match");
    }

    const userJwt = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send({
      success: true,
      message: "user login success",
      user,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const userLogOut = (req: Request, res: Response) => {
  req.session = null;

  res.send({ currentUser: null });
};
