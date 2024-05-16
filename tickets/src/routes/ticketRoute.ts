import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { body } from "express-validator";
import {
  addTicket,
  editTicket,
  getAllTickets,
  getSingleTicket,
} from "../controller/ticketController";
import { validateBody } from "../middleware/validateBody";

const router = express.Router();

router.get("/", requireAuth, getAllTickets);

router.post(
  "/addticket",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateBody,
  addTicket
);

router.get("/:id", requireAuth, getSingleTicket);

router.put(
  "/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateBody,
  editTicket
);

export default router;
