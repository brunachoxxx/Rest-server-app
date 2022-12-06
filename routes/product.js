import { Router } from "express";
import { check } from "express-validator";
import {
  delProduct,
  getProduct,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { isProductNameOnDb, isProductOnDb } from "../helpers/db_validation.js";
import { jwtValidation } from "../middlewares/jwt-validation.js";
import { hasRole } from "../middlewares/role-validation.js";
import { validation } from "../middlewares/validations.js";

export const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get(
  "/:id",
  check("id", "Id is required").isMongoId().notEmpty(),
  check("id", "Product Id not found").custom(isProductOnDb),
  validation,
  getProduct
);

productRouter.post(
  "/",
  [
    jwtValidation,
    hasRole("ADMIN_ROLE"),
    check("name", "The name is required").notEmpty(),
    check("name").custom(isProductNameOnDb),
    /* check("description", "At least 4 chars and less than 200")
      .isString()
      .isLength({ min: 4, max: 200 }), */
    validation,
  ],
  newProduct
);

productRouter.put(
  "/:id",
  jwtValidation,
  hasRole("ADMIN_ROLE"),
  check("id", "Id is required").isMongoId().notEmpty(),
  check("id", "Product Id not found on db").custom(isProductOnDb),
  check("Price"),
  validation,
  updateProduct
);

productRouter.delete(
  "/:id",
  jwtValidation,
  hasRole("ADMIN_ROLE"),
  check("id", "Invalid mongo id").isMongoId(),
  check("id", "Product Id not found").custom(isProductOnDb),
  validation,
  delProduct
);
