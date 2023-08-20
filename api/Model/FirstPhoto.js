import { Schema, model } from "mongoose";

const firstPhotoSchema = new Schema(
  {
    display_number: { type: Number, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const FirstPhoto = model("FirstPhoto", firstPhotoSchema);

export default FirstPhoto;
