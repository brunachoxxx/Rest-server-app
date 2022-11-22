import { body, check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { Router } from "express";
import { validation } from "../middlewares/validations.js";
export const routerAuth = Router();

routerAuth.post(
  "/login",
  check("mail", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
  validation,
  login
);

routerAuth.post(
  "/google",
  check("token_id", "Google token needed").notEmpty(),
  validation,
  googleSignIn
);
