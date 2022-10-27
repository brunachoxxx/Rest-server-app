import { Router } from "express";
import { body, check } from "express-validator";
import { validation } from "../middlewares/validations.js";
import {
  isEmailOnDb,
  isRoleValid,
  isValidId,
} from "../helpers/db_validation.js";
import {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  delUsers,
} from "../controllers/users.js";

export const router = Router();

router.get("/", getUsers);
router.put(
  "/:id",
  [
    check("id", "invalid Id").isMongoId(),
    check("id").custom(isValidId),
    check("role").custom(isRoleValid),
  ],
  validation,
  putUsers
);
router.post(
  "/",
  body("name", "The name is required").notEmpty(),
  body("password", "The password must contain at least 6 chars").isLength({
    min: 6,
  }),
  body("mail").custom(isEmailOnDb),
  body("role").custom(isRoleValid),
  validation,
  postUsers
);
router.patch("/", patchUsers);
router.delete(
  "/:id",
  check("id", "invalid Id").isMongoId(),
  check("id").custom(isValidId),
  validation,
  delUsers
);
