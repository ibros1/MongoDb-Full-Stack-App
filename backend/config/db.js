import mongoose from "mongoose";
import { dbURL } from "./config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("connected to the databse");
  } catch (error) {
    console.log(`error connecting databse ${error}`);
    process.exit(1);
  }
};
