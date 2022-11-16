import User from "../models/user.js";
import { response } from "express";
import bcrypt from "bcryptjs";
import { jwtGen } from "../helpers/jwt-gen.js";

export const login = async (req, res = response) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "Mail not found",
      });
    }
    if (!user.state) {
      return res.status(400).json({
        msg: "User not found - account deleted",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "User not found - wrong password",
      });
    }

    const token = await jwtGen(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went worng, connect with admin",
    });
  }
};
