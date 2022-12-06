import Category from "../models/category.js";
import User from "../models/user.js";
import { request, response } from "express";

// get categories paginated, total, papulated
export const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .limit(Number.parseInt(limit))
      .skip(Number.parseInt(from)),
  ]);

  res.json({
    total,
    categories,
  });
};

// get category populated

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");
  return res.json(category);
};

// create category

export const newCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const categoryDb = await Category.findOne({ name });

  if (categoryDb) {
    return res.status(400).json({
      msg: `Category ${categoryDb.name} already exist`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(200).json(category);
};

// update category

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, state, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data);

  res.json({
    category,
  });
};

// delete category => state: false

export const delCategory = async (req, res = response) => {
  const { id } = req.params;

  const categoryD = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json({
    categoryD,
  });
};
