import express from "express";
import { body } from "express-validator";
import { addUser, getUser } from "../controller/authController";

const router = express.Router();

router.get("/user", getUser);
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 6, max: 10 })
      .withMessage("password must be between 6 to 10 character"),
  ],
  addUser
);

export default router;
