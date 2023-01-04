import { Router } from "express";
import {
  loadFiles,
  showImg,
  updateImgCloudinary,
} from "../controllers/uploads.js";
import { check } from "express-validator";
import { validation } from "../middlewares/validations.js";
import { isCollectionValid } from "../helpers/db_validation.js";
import user from "../models/user.js";
import { fileUploadValidator } from "../middlewares/file-validator.js";

export const uploadRouter = Router();

uploadRouter.post("/", fileUploadValidator, loadFiles);

uploadRouter.put(
  "/:collection/:id",
  fileUploadValidator,
  [
    check("id", "Not an Mongo Id").isMongoId(),
    check("collection", "The collection doesn't exist").custom((c) =>
      isCollectionValid(["users", "products"], c)
    ),
    validation,
  ],
  updateImgCloudinary
);

uploadRouter.get("/:collection/:id", [
  check("id", "Not an Mongo Id").isMongoId(),
  check("collection", "The collection doesn't exist").custom((c) =>
    isCollectionValid(["users", "products"], c)
  ),
  validation,
  showImg,
]);
