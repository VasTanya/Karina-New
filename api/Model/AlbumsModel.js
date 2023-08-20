import { Schema, model } from "mongoose";

const albumsSchema = new Schema(
  {
    album_number: { type: Number, required: true },
    title: { type: String, required: true },
    album: [
      {
        display_number: { type: Number, required: true },
        src: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Albums = model("Albums", albumsSchema);

export default Albums;
