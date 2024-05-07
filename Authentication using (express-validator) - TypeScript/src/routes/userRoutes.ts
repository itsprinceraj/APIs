import { Router } from "express";

const userRouter = Router();

// import handlers from controller
import { getAllUsers, signUp, login } from "../controllers/authentication.js";
import {
  validate,
  signUpValidator,
  loginValidator,
} from "../utilities/validator.js";

// http request
userRouter.get("/users", getAllUsers);
userRouter.post("/signUp", validate(signUpValidator), signUp);
userRouter.post("/login", validate(loginValidator), login);

// export userRouter
export { userRouter };
