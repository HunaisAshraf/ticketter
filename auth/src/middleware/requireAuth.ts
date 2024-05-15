import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization!;

    jwt.verify(token, process.env.JWT_KEY!, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "user not authorised" });
      } else {
        req.user = decode;
        next();
      }
    });
    // if (!req.session?.jwt) {
    //   return res.status(401).send({ message: "user not authorised" });
    // }
  } catch (error) {
    console.log(error);
    res.status(401).send({ currentUser: null, message: "unauthorised user" });
  }
};
