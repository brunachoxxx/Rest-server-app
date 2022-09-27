import { Router } from "express";
import {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  delUsers,
} from "../controllers/users.js";

export const router = Router();

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", postUsers);
router.patch("/", patchUsers);
router.delete("/", delUsers);
