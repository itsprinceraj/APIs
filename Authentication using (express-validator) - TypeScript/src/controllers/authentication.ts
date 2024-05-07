import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../utilities/constants.js";
const JWT_SEC_KEY = process.env.JWT_SECRET;

// Get All users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    // return response with success flag
    res.status(200).json({
      success: true,
      message: "User Details fetched Successfully",
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to get user Details",
    });
  }
};

// User SignUp
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get data from req body
    const { name, email, password } = req.body;

    // check if user is already registered
    const newUser = await User.findOne({ email });
    if (newUser) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // hash the password
    const hashedPass = await hash(password, 10);

    // create a db entry
    const user = new User({ name, email, password: hashedPass }); // creating a object here and then save it to the DB
    await user.save(); // saves the above created object in DB

    // create token and store cookie

    // create a token
    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_SEC_KEY, {
      expiresIn: "10d",
    });

    // create options for cookie
    const options = {
      path: "/",
      domain: "localhost",
      signed: true,
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    };

    // send cookie in response
    res.cookie(COOKIE_NAME, token, options).status(200).json({
      success: true,
      message: "user Registered Successfully",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Facing issue with signUp request",
    });
  }
};

// User Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get data from req body
    const { email, password } = req.body;

    // now aunthenticate password
    const user = await User.findOne({ email });
    if (await compare(password, user.password)) {
      const payload = {
        name: user.name,
        email: user.email,
        id: user._id,
      };

      // create a token
      const token = jwt.sign(payload, JWT_SEC_KEY, {
        expiresIn: "10d",
      });

      // create options for cookie
      const options = {
        path: "/",
        domain: "localhost",
        signed: true,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      };

      // clear previous cokkie befor login again
      res.clearCookie(COOKIE_NAME, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        secure: true,
        signed: true,
      });

      // send cookie in response
      res.cookie(COOKIE_NAME, token, options).status(200).json({
        success: true,
        message: "user logged-in Successfully",
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Facin issue while user login",
    });
  }
};
