import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "name required"],
  },

  mail: {
    type: String,
    required: [true, "mail required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password required"],
  },
  img: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  state: {
    type: Boolean,
    default: true,
  },

  googleAuth: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export default model("User", userSchema);
