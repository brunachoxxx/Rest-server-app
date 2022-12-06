import { Router } from "express";
import { check } from "express-validator";
import {
  newCategory,
  updateCategory,
  getCategories,
  delCategory,
  getCategory,
} from "../controllers/category.js";
import { jwtValidation } from "../middlewares/jwt-validation.js";
import { validation } from "../middlewares/validations.js";
import {
  isCategoryOnDb,
  isCategoryNameOnDb,
} from "../helpers/db_validation.js";
import { hasRole } from "../middlewares/role-validation.js";

export const routerCategory = Router();

routerCategory.get("/", getCategories);

routerCategory.get(
  "/:id",
  [
    check("id", "Invalid mongo id").isMongoId(),
    check("id").custom(isCategoryOnDb),
    validation,
  ],
  getCategory
);

routerCategory.post(
  "/",
  [jwtValidation, check("name", "The name is required").notEmpty(), validation],
  newCategory
);

routerCategory.put(
  "/:id",
  jwtValidation,
  check("id").custom(isCategoryOnDb),
  check("name", "Name is required").notEmpty(),
  check("name").custom(isCategoryNameOnDb),
  validation,
  updateCategory
);

routerCategory.delete(
  "/:id",
  jwtValidation,
  hasRole("ADMIN_ROLE"),
  check("id", "Invalid mongo id").isMongoId(),
  check("id").custom(isCategoryOnDb),
  validation,
  delCategory
);
