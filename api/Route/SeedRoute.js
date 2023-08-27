import { Router } from "express";
import data from "../data.js";
import FirstPhoto from "../Model/FirstPhoto.js";
import Albums from "../Model/AlbumsModel.js";
import Slices from "../Model/SlicesModel.js";
import Regular from "../Model/RegularModel.js";
import AlbumData from "../Model/AlbumDataModel.js";

const seedRouter = Router();

seedRouter.get("/seed", async (req, res) => {
  try {
    await FirstPhoto.deleteMany({});
    await Albums.deleteMany({});
    await AlbumData.deleteMany({});
    await Slices.deleteMany({});
    await Regular.deleteMany({});

    const createdAlbums = await Albums.insertMany(data.albums);

    const albumDataToInsert = data.albums.map((album) => ({
      albumId: createdAlbums.find(
        (createdAlbum) => createdAlbum.title === album.title
      )._id,
      data: album.album,
    }));

    const createdAlbumData = await AlbumData.insertMany(albumDataToInsert);

    createdAlbums.forEach(async (album) => {
      const correspondingAlbumData = createdAlbumData.find((albumData) =>
        albumData.albumId.equals(album._id)
      );
      if (correspondingAlbumData) {
        album.albumDataId = correspondingAlbumData._id;
        await album.save();
      }
    });

    const createdFirstPhoto = await FirstPhoto.insertMany(data.firstPhoto);
    const createdSlices = await Slices.insertMany(data.slices);
    const createdRegular = await Regular.insertMany(data.regular);

    res.status(201).send({
      createdFirstPhoto,
      createdAlbums,
      createdAlbumData,
      createdSlices,
      createdRegular,
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).send("Error during seeding: ", error.message);
  }
});

export default seedRouter;
