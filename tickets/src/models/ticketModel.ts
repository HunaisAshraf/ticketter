import mongoose, { Document, Schema, model } from "mongoose";

interface Iticket extends Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new Schema<Iticket>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});

export const TicketModel = model<Iticket>("Ticket", ticketSchema);
