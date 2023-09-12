import { Schema, model } from "mongoose";

const albumDataSchema = new Schema(
  {
    albumId: { type: Schema.Types.ObjectId, ref: "Albums" },
    data: [
      {
        display_number: { type: Number, required: true },
        src: { type: String, required: true },
        tag: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const AlbumData = model("AlbumData", albumDataSchema);

export default AlbumData;
