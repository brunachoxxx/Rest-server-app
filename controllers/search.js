import { response } from "express";
import User from "../models/user.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import { isValidObjectId } from "mongoose";

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUser = async (termn = "", res = response) => {
  const isMongoId = isValidObjectId(termn);

  if (isMongoId) {
    const user = await User.findById(termn);
    return res.json({ result: user ? [user] : [] });
  }

  const regExp = new RegExp(termn, "i");
  const users = await User.find({
    $or: [{ name: regExp }, { mail: regExp }],
    $and: [{ state: true }],
  });
  res.json({ results: users });
};

const searchCategories = async (termn = "", res = response) => {
  const isMongoId = isValidObjectId(termn);
  if (isMongoId) {
    const category = await Category.findById(termn).populate("user", "name");
    return res.json({ result: category ? [category] : [] });
  }

  const regExp = new RegExp(termn, "i");
  const categories = await Category.find({
    name: regExp,
    state: true,
  }).populate("user", "name");
  res.json({ result: categories });
};

const searchProducts = async (termn = "", res = response) => {
  const isMongoId = isValidObjectId(termn);
  if (isMongoId) {
    const product = await Product.findById(termn).populate("category", "name");
    return res.json({ result: product ? [product] : [] });
  }

  const regExp = new RegExp(termn, "i");
  const products = await Product.find({ name: regExp, state: true }).populate(
    "category",
    "name"
  );
  res.json({ result: products });
};

export const search = (req, res = response) => {
  const { collection, termn } = req.params;

  if (!allowedCollections.includes(collection)) {
    res.status(400).json({
      msg: `${collection} is not an allowed collection`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(termn, res);
      break;
    case "categories":
      searchCategories(termn, res);
      break;
    case "products":
      searchProducts(termn, res);
      break;

    default:
      res.status(500).json({ msg: "I forgot this search" });
      break;
  }
};
