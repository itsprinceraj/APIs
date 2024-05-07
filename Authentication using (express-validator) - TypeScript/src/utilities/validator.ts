import { NextFunction, Request, Response } from "express";
import { body, ContextRunner, validationResult } from "express-validator";

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validaion of validations) {
      const result = await validaion.run(req);
      if (!result.isEmpty()) break; // single statement can be written in single line
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

// login validator
export const loginValidator = [
  body("email").trim().isEmail().withMessage("email is required"),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain atleast 8 lettersn with atleast 1 uppercase , 1 lowercase , 1 symbol "
    ),
];

// signup validator
export const signUpValidator = [
  body("name").notEmpty().trim().withMessage("name is required"),
  ...loginValidator,
];
