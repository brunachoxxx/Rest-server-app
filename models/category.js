import { Schema, model } from "mongoose";

const categorySchema = Schema({
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
});

categorySchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

export default model("Category", categorySchema);
