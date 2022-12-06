import Category from "../models/category.js";
import Product from "../models/product.js";
import Role from "../models/roles.js";
import User from "../models/user.js";

export const isRoleValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role: ${role} is not registered`);
  }
};

export const isEmailOnDb = async (mail = "") => {
  const emailExist = await User.findOne({ mail });
  if (emailExist) {
    throw new Error(`Email: ${mail} already registered`);
  }
};

export const isCategoryOnDb = async (id) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`Category with id: ${id} doesn't exist`);
  }
};

export const isValidId = async (id) => {
  const idExist = await User.findById(id);
  if (!idExist) {
    throw new Error(`Id ${id} not found`);
  }
};

export const isCategoryNameOnDb = async (name = "") => {
  name = name.toUpperCase();
  const nameExist = await Category.findOne({ name });
  if (nameExist) {
    throw new Error(`Category name ${name} already exist`);
  }
};

export const isProductOnDb = async (id) => {
  const idExist = await Product.findById(id);
  if (!idExist) {
    throw new Error(`Product with id: ${id} doesn't exist`);
  }
};

export const isProductNameOnDb = async (name = "") => {
  name = name.toUpperCase();
  const nameExist = await Product.findOne({ name });
  if (nameExist) {
    throw new Error(`Product with name: ${name} already exist`);
  }
};
