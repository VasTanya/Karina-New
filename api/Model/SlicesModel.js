import { Schema, model } from "mongoose";

const slicesSchema = new Schema(
  {
    display_number: { type: Number, required: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Slices = model("Slices", slicesSchema);

export default Slices;
