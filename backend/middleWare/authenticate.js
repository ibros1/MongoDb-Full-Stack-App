import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

export const Authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        isSuccess: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error); // log the error for debugging
    res.status(401).json({
      isSuccess: false,
      message: "Invalid or expired token",
    });
  }
};
