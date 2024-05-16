import { Request, Response, NextFunction } from "express";
import { TicketModel } from "../models/ticketModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await TicketModel.find();

    if (!tickets) {
      throw new Error("ticket not found");
    }

    res.status(200).send({ success: true, tickets });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addTicket = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, price } = req.body;

    const ticket = new TicketModel({
      title,
      price,
      userId: req.user.id,
    });
    await ticket.save();

    res.status(201).send({
      success: true,
      message: "ticket added successfully",
      ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    console.log(id);

    const ticket = await TicketModel.findById(id);

    if (!ticket) {
      throw new Error("ticket not found");
    }

    res.status(200).send({
      success: true,
      ticket,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ticket not found",
    });
    next(error);
  }
};

export const editTicket = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { title, price } = req.body;
    const ticket = await TicketModel.findById(id);

    if (!ticket) {
      throw new Error("ticket not found");
    }
    console.log(`userId : ${req.user.id}, ticketUser : ${ticket.userId}`);

    if (ticket?.userId !== req.user.id) {
      throw new Error("Not Authorized");
    }

    await ticket.set({ title, price }).save();

    return res.status(200).send({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
