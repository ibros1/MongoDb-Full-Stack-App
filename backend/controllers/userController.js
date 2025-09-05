import { JWT_SECRET_KEY } from "../config/config.js";
import userModel from "../models/users.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const emailLower = email.toLowerCase();
    const usernameLower = username.toLowerCase();
    const isUserExists = await userModel.findOne({
      $or: [{ email: emailLower }, { username: usernameLower }],
    });
    if (isUserExists) {
      return res.status(400).send("Email or username already exists");
    }

    const newUserInfo = await userModel({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
    });
    await newUserInfo.save();
    newUserInfo.password = undefined;
    return res.status(201).json({
      isSuccess: true,
      message: "succesfully registered new user",
      newUserInfo,
    });
  } catch (error) {
    console.error(error);
    res.send("server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        isSuccess: false,
        message: "validating login error!",
      });
    }

    // Use findOne with a query object, not $where
    const user = await userModel
      .findOne({
        email: String(email).toLowerCase(),
      })
      .select("+password");
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "user not found!",
      });
    }

    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(404).json({
        isSuccess: false,
        message: "Incorrect Password!",
      });
    }

    user.password = undefined;

    // token generation
    const expiresIn = 7 * 24 * 60 * 60;
    const token = jwt.sign({ _id: user.id }, JWT_SECRET_KEY, {
      expiresIn,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });

    res.status(200).json({
      isSuccess: true,
      message: "Successfully logged in",
      user,
      expiresIn,
    });
  } catch (error) {
    console.error(error);
  }
};
