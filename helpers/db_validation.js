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

export const isValidId = async (id) => {
  const idExist = await User.findById(id);
  if (!idExist) {
    throw new Error(`Id ${id} not found`);
  }
};
