import { Schema, model } from "mongoose";

/**
 * @deprecated
 */

const regularSchema = new Schema(
  {
    display_number: { type: Number, required: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Regular = model("Regular", regularSchema);

export default Regular;
