import { Router } from "express";
import { search } from "../controllers/search.js";

export const searchRouter = Router();

searchRouter.get("/:collection/:termn", search);
