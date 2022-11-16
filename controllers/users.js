import { response, request } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number.parseInt(limit)).skip(Number.parseInt(from)),
  ]);

  res.json({
    total,
    users,
  });
};

export const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, googleAuth, mail, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: "Put Api - controller",
    user,
  });
};

export const postUsers = async (req = request, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  //password encrypt
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //save
  await user.save();

  res.json({
    msg: "Post Api - controller",
    user,
  });
};

export const patchUsers = (req, res = response) => {
  res.json({
    msg: "Patch Api - controller",
  });
};

export const delUsers = async (req, res = response) => {
  const { id } = req.params;

  const userD = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json({
    userD,
  });
};
