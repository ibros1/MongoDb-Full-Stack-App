import express from "express";
import { connect } from "mongoose";
import chalk from "chalk";
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/post.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 8000;
connectDb();
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(PORT, () => {
  console.log(
    `${chalk.green("Server:")} is running on port ${chalk.green(PORT)}`
  );
});
