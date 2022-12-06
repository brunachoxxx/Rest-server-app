import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { router } from "../routes/users.js";
import { routerAuth } from "../routes/auth.js";
import { routerCategory } from "../routes/category.js";
import { productRouter } from "../routes/product.js";
import { searchRouter } from "../routes/search.js";
import { dbconect } from "../database/config.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //paths
    this.paths = {
      user: "/api/users",
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
      search: "/api/search",
    };

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
    this.app.use(this.paths.user, router);
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.category, routerCategory);
    this.app.use(this.paths.product, productRouter);
    this.app.use(this.paths.search, searchRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
