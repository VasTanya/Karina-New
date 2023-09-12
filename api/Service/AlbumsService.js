import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";
import logger from "../Utils/Logger/Logger.js";
import mongoose from "mongoose";

class AlbumsService {
  constructor() {}

  getAll = async (page, size) => {
    const skip = (page - 1) * size;

    const albums = await Albums.find().skip(skip).limit(size);
    return albums;
  };

  getById = async (id, page, size) => {
    const skip = (page - 1) * size;

    const albumDataById = await AlbumData.findOne({ albumId: id }).populate(
      "albumId"
    );

    if (!albumDataById) throw { statusCode: 404, message: "Album not found" };

    const paginatedArray = albumDataById.data.slice(skip, skip + size);

    const paginatedAlbumData = {
      ...albumDataById.toObject(),
      data: paginatedArray,
    };
    return paginatedAlbumData;
  };

  getItemById = async (id, item) => {
    const albumData = await AlbumData.findOne({ albumId: id });

    const albumDataItem = albumData.data.find((el) => el._id.equals(item));

    return albumDataItem;
  };

  firstPhoto = async () => {
    const albumData = await AlbumData.find();

    const firstPhotos = albumData.map((item) => {
      return item.data.find((el) => el.tag === "firstPhoto");
    });

    return firstPhotos;
  };

  search = async (albumNumber, displayNumber) => {
    const albums = await AlbumData.find().populate("albumId");

    if (
      displayNumber === undefined ||
      !displayNumber ||
      displayNumber.trim() === ""
    ) {
      const result = albums.filter((query) =>
        String(query.albumId.album_number).includes(albumNumber)
      );

      if (result.length === 0) {
        return `No result for ${albumNumber}`;
      }

      return result;
    } else {
      const matchingAlbums = albums.filter(
        (query) => String(query.albumId.album_number) === albumNumber
      );

      const result = [];

      matchingAlbums.forEach((album) => {
        const matchingData = album.data.filter((data) =>
          String(data.display_number).includes(displayNumber)
        );

        if (matchingData.length > 0) {
          result.push({
            album_number: album.albumId.album_number,
            matching_data: matchingData,
          });
        }
      });

      if (result.length === 0) {
        return `No result for ${albumNumber}`;
      }

      return result;
    }
  };

  edit = async (data) => {
    const item = await Albums.findOneAndUpdate(data);
    return item;
  };

  delete = async (id) => {
    const item = await Albums.findOneAndDelete(id);
    return item;
  };
}

export default AlbumsService;
