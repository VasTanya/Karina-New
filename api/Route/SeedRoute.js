import { Router } from "express";
import data from "../data.js";
import Albums from "../Model/AlbumsModel.js";
import Slices from "../Model/SlicesModel.js";
import Regular from "../Model/RegularModel.js";
import AlbumData from "../Model/AlbumDataModel.js";
import Admin from "../Model/AdminModel.js";
import logger from "../Utils/Logger/Logger.js";
import response from "../Utils/Response.js";
import bcrypt from "bcryptjs";

const seedRouter = Router();

seedRouter.get("/", async (req, res) => {
  try {
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
      count: album.album.length,
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

    const createdSlices = await Slices.insertMany(data.slices);
    const createdRegular = await Regular.insertMany(data.regular);

    response(res, 201, {
      createdAlbums,
      createdAlbumData,
      createdSlices,
      createdRegular,
    });
  } catch (error) {
    logger.error("Seed error:", error);
    response(
      res,
      error.statusCode || 500,
      "Error during seeding: ",
      error.message
    );
  }
});

seedRouter.get("/admin", async (req, res) => {
  try {
    await Admin.deleteMany({});

    const createdAdmin = new Admin({
      login: "test",
      email: "test@email.com",
      password: bcrypt.hashSync("12345678", 10),
    });

    await createdAdmin.save();

    response(res, 201, createdAdmin);
  } catch (error) {
    logger.error("Seed error:", error);
    response(
      res,
      error.statusCode || 500,
      "Error during seeding: ",
      error.message
    );
  }
});

export default seedRouter;
