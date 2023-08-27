import { Schema, model } from "mongoose";

const albumsSchema = new Schema(
  {
    album_number: { type: Number, required: true },
    title: { type: String, required: true },
    albumDataId: {
      type: Schema.Types.ObjectId,
      ref: "AlbumData",
    },
  },
  { timestamps: true }
);

const Albums = model("Albums", albumsSchema);

export default Albums;
