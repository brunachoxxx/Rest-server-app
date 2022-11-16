import { body, check } from "express-validator";
import { login } from "../controllers/auth.js";
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
