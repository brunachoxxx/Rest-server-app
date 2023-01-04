import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "State is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  img: { type: String },
  available: { type: Boolean, default: true },
});

productSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

export default model("Product", productSchema);
