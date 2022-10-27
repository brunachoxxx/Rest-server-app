import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { router } from "../routes/users.js";
import { dbconect } from "../database/config.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await dbconect();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
