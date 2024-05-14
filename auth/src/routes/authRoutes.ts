import express from "express";
import { body } from "express-validator";
import { addUser, getUser, loginUser, userLogOut } from "../controller/authController";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.get("/currentuser",requireAuth, getUser);
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
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("password must be provided"),
  ],
  loginUser
);
router.get("/logout",userLogOut)

export default router;
