import User from "../models/user.js";
import { response } from "express";
import bcrypt from "bcryptjs";
import { jwtGen } from "../helpers/jwt-gen.js";
import { googleVerify } from "../helpers/google-verify.js";

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

export const googleSignIn = async (req, res) => {
  const { token_id } = req.body;

  try {
    const { name, img, mail } = await googleVerify(token_id);

    let user = await User.findOne({ mail });
    // user is not in db
    if (!user) {
      const data = {
        name,
        mail,
        password: ":p",
        img,
        role: "USER_ROLE",
        googleAuth: true,
      };
      // create user
      const user = new User(data);
      await user.save();
    }
    //user with state false
    if (!user.state) {
      return res.status(401).json({
        msg: "User block, talk with admin",
      });
    }

    //JWT genration
    const token = await jwtGen(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Can't veryfy token",
    });
  }
};
