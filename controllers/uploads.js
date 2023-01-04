import { response } from "express";
import { uploadFile } from "../helpers/file-upload.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import * as cloudinary from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadFiles = async (req, res = response) => {
  if (!req.files.file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  try {
    const uFileName = await uploadFile(req.files, undefined, "imgs");
    res.json({ "file Uploaded": uFileName });
  } catch (error) {
    res.json({ msg: error });
  }
};

//locally, not calling for imgs
export const updateImg = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `User with Id ${id} doesn't exist` });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `Product with Id ${id} doesn't exist` });
      }

      break;

    default:
      return res.status(500).json({ msg: `I forgot to check that` });
  }
};

//Cloudinary this is the function we are calling for imgs
export const updateImgCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `User with Id ${id} doesn't exist` });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `Product with Id ${id} doesn't exist` });
      }

      break;

    default:
      return res.status(500).json({ msg: `I forgot to check that` });
  }

  //clean img folder
  if (model.img) {
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  res.json({ model });
};

export const showImg = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `User with Id ${id} doesn't exist` });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: `Product with Id ${id} doesn't exist` });
      }

      break;

    default:
      return res.status(500).json({ msg: `I forgot to check that` });
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, model.img);

    if (existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }
  const notFoundImg = path.join(__dirname, "../assets", "no-image.jpg");
  res.sendFile(notFoundImg);
};
