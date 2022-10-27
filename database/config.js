import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const dbconect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error starting DB");
  }
};
