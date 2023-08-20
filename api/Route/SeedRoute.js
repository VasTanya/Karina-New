import { Router } from "express";
import data from "../data.js";
import FirstPhoto from "../Model/FirstPhoto.js";
import Albums from "../Model/AlbumsModel.js";
import Slices from "../Model/SlicesModel.js";
import Regular from "../Model/RegularModel.js";

const seedRouter = Router();

seedRouter.get("/seed", async (req, res) => {
  await FirstPhoto.deleteMany({});
  const createdFirstPhoto = await FirstPhoto.insertMany(data.firstPhoto);
  await Albums.deleteMany({});
  const createdAlbums = await Albums.insertMany(data.albums);
  await Slices.deleteMany({});
  const createdSlices = await Slices.insertMany(data.slices);
  await Regular.deleteMany({});
  const createdRegular = await Regular.insertMany(data.regular);

  res.status(201).send({
    createdFirstPhoto,
    createdAlbums,
    createdSlices,
    createdRegular,
  });
});

export default seedRouter;
