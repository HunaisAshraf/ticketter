import mongoose, { Document, Schema, model } from "mongoose";

interface IUser extends Document{
  name: string;
  email: string;
  phone: number;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model<IUser>("User", userSchema);

