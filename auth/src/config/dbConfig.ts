import mongoose, { mongo } from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/ticket");
    console.log("db connection successfull");
  } catch (error) {
    console.log("error in db connectioin ",error);
  }
};
