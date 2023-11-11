import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";
import { rmdirSync, unlinkSync, mkdirSync } from "fs";
import { join, dirname } from "path";

class AlbumsService {
  constructor() {}

  getAll = async () => {
    const albums = await Albums.find();

    const sortedAlbums = albums.sort((a, b) => a.album_number - b.album_number);

    return sortedAlbums;
  };

  firstPhoto = async () => {
    const albumData = await AlbumData.find().populate("albumId");

    const firstPhotos = albumData.map((item) => {
      const data = {
        album: item.albumId,
        firstPhotos: item.data.filter((el) => el.tag === "firstPhoto"),
      };

      return data;
    });

    return firstPhotos;
  };

  getById = async (id, page, size) => {
    const skip = (page - 1) * size;

    const albumDataById = await AlbumData.findOne({ albumId: id }).populate(
      "albumId"
    );

    if (!albumDataById) throw { statusCode: 404, message: "Album not found" };

    // let paginatedArray = albumDataById.data;

    const paginatedArray =
      size === -1
        ? albumDataById.data
        : albumDataById.data.slice(skip, skip + size);

    const paginatedAlbumData = {
      ...albumDataById.toObject(),
      data: paginatedArray.sort((a, b) => a.display_number - b.display_number),
    };

    return paginatedAlbumData;
  };

  getItemById = async (id, item) => {
    const albumData = await AlbumData.findOne({ albumId: id });

    const albumDataItem = albumData.data.find((el) => el._id.equals(item));

    return albumDataItem;
  };

  search = async (albumNumber, displayNumber) => {
    const albums = await AlbumData.find().populate("albumId");

    if (!displayNumber) {
      const result = albums.filter(
        (query) => String(query.albumId.album_number) === albumNumber
      );

      if (result.length === 0) {
        return `No result for album number ${albumNumber}`;
      }

      return result;
    } else {
      const matchingAlbums = albums.filter(
        (query) => String(query.albumId.album_number) === albumNumber
      );

      const result = [];

      matchingAlbums.forEach((album) => {
        const matchingData = album.data.find(
          (data) => String(data.display_number) === displayNumber
        );

        if (matchingData) {
          result.push({
            album_number: album.albumId.album_number,
            matching_data: matchingData,
          });
        }
      });

      if (result.length === 0) {
        return `No result for album number ${albumNumber} and display number ${displayNumber}`;
      }

      return result;
    }
  };

  editAlbum = async (data) => {
    const updatedAlbum = await Albums.findByIdAndUpdate(data._id, data);

    if (!updatedAlbum) {
      throw new Error("Album not found");
    }

    return updatedAlbum;
  };

  editItem = async (data) => {
    const album = await AlbumData.findOne({ albumId: data.albumId });

    const item = album.data.find((el) => el._id.equals(data.item));

    if (!item) {
      throw new Error("Item not found");
    }
    item.display_number = parseInt(data.display_number);

    await album.save();

    return item;
  };

  addAlbum = async (title) => {
    const albums = await Albums.find();

    const newAlbum = await Albums.create({
      album_number: albums.length + 1,
      title: title,
    });

    const newAlbumData = await AlbumData.create({
      albumId: newAlbum._id,
    });

    newAlbum.albumDataId = newAlbumData._id;

    await newAlbum.save();

    const path = join(
      dirname(
        new URL(import.meta.url).pathname,
        "..",
        "Public",
        "img",
        `${albums.length + 1}.${title}`
      ),
      "..",
      "Public",
      "img",
      `${albums.length + 1}.${title}`
    );

    try {
      mkdirSync(path);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    return { message: "Album created succesfully" };
  };

  addItem = async (data) => {
    const album = await AlbumData.findOne({ albumId: data.albumId });

    const newItem = {
      display_number: album.data.length + 1,
      src: data.src,
      tag: data.tag === "$true" ? "firstPhoto" : "",
    };

    album.data.push(newItem);

    album.count = album.data.length;

    await album.save();

    return { message: "Album item created successfully" };
  };

  deleteAlbum = async (id) => {
    const album = await Albums.findByIdAndDelete(id);
    const albumData = await AlbumData.findOneAndDelete({ albumId: id });

    const path = join(
      dirname(
        new URL(import.meta.url).pathname,
        "..",
        "Public",
        "img",
        `${album.album_number}.${album.title}`
      ),
      "..",
      "Public",
      "img",
      `${album.album_number}.${album.title}`
    );

    try {
      rmdirSync(path);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    return album;
  };

  deleteItem = async (id, itemId, src) => {
    const album = await AlbumData.findOne({ albumId: id });

    if (!album) {
      throw new Error("Album not found");
    }

    const item = album.data.find((el) => el._id.equals(itemId));

    if (!item) {
      throw new Error("Item not found");
    }

    album.data.pull(item);
    album.count = album.data.length;

    await album.save();

    const path = join(
      dirname(new URL(import.meta.url).pathname, "..", "Public", src),
      "..",
      "Public",
      src
    );

    try {
      unlinkSync(path);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    return item;
  };
}

export default AlbumsService;
