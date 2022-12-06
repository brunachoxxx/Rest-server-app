import Product from "../models/product.js";
import Category from "../models/category.js";
import { response, request } from "express";

//get products
export const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .limit(Number.parseInt(limit))
      .skip(Number.parseInt(from)),
  ]);

  res.json({
    total,
    products,
  });
};

//get product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  return res.json(product);
};

//create product

export const newProduct = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const productDb = await Product.findOne({ name });

  const categoryName = req.body.category.toUpperCase();
  const categoryOnDb = await Category.findOne({ name: categoryName });

  if (productDb) {
    return res.status(400).json({
      msg: `Product ${name} already exist.`,
    });
  }

  if (!categoryOnDb) {
    return res.status(400).json({
      msg: `Category ${categoryName} doesn't exist.`,
    });
  }
  console.log(categoryName);
  const data = {
    name,
    category: categoryOnDb._id,
    user: req.user._id,
    description: req.body.description,
    price: req.body.price,
  };

  const product = new Product(data);
  await product.save();

  res.status(200).json(product);
};

// update product
export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { user, state, ...data } = req.body;

  if (data.name) {
    data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({
    product,
  });
};

// delete product
export const delProduct = async (req, res = response) => {
  const { id } = req.params;

  const productD = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json({
    productD,
  });
};
