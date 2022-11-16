import jwt from "jsonwebtoken";
import User from "../models/user.js";
import * as dotenv from "dotenv";
dotenv.config();

export const jwtValidation = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    res.status(401).json({
      msg: "token not found in request",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;

    const authUser = await User.findById(uid);
    if (!authUser) {
      res.status(401).json({
        msg: "Invalid Token - not in DB",
      });
    }

    if (!authUser.state) {
      res.status(401).json({
        msg: "Invalid Token - state false",
      });
    }

    req.user = authUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};
