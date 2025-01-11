import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";
import { rmdirSync, unlinkSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import DbService from "./DbService.js";

class AlbumsService extends DbService {
  constructor() {
    super("albums");
    this.albumData = new DbService("albumData");
  }

  getAll = async (page, size) => {
    return this.find(page, size);
  };

  firstPhoto = async () => {
    const albumData = await this.findAllAndPopulate();

    return albumData.map((item) => ({
      album: item.albumId,
      firstPhotos: item.data.filter((el) => el.tag === "firstPhoto"),
    }));
  };

  getById = async (id, page, size) => {
    const skip = (page - 1) * size;

    const mappedAlbumData = await this.findOneAndPopulate(id);

    if (!mappedAlbumData) return {};

    const paginatedArray =
      size === -1 ?
        mappedAlbumData.data :
        mappedAlbumData.data.slice(skip, skip + size);

    const paginatedAlbumData = {
      ...mappedAlbumData,
      data: paginatedArray.sort((a, b) => a.display_number - b.display_number),
    };

    return paginatedAlbumData;
  };

  getItemById = async (id, item) => {
    const albumData = await this.albumData.findOne({ albumId: id });
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    if (!albumData) return {};

    const albumDataItem = albumData.data.find((el) => el._id === item);

    return albumDataItem;
  };

  search = async (albumNumber, displayNumber) => {
    const albums = await this.findAllAndPopulate();

    if (!displayNumber) {
      const result = albums.filter(
          (query) => query.albumId.album_number === albumNumber,
      );

      if (result.length === 0) {
        return { message: `No result for album number ${albumNumber}` };
      }

      return result;
    } else {
      const matchingAlbums = albums.filter(
          (query) => query.albumId.album_number === albumNumber,
      );

      const result = [];

      matchingAlbums.forEach((album) => {
        const matchingData = album.data.find(
            (data) => data.display_number === displayNumber,
        );

        if (matchingData) {
          result.push({
            album_number: album.albumId.album_number,
            matching_data: matchingData,
          });
        }
      });

      if (result.length === 0) {
        return {
          message: `No result for album number ${albumNumber} and display number ${displayNumber}`,
        };
      }

      return result;
    }
  };

  editAlbum = async (id, data) => {
    const updatedAlbum = await this.findByIdAndUpdate(id, data);

    if (!updatedAlbum) {
      throw new Error("Album not found");
    }

    return updatedAlbum;
  };

  editItem = async (data) => {
    const album = await this.albumData.findOne({ albumId: data.albumId });

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
            `${albums.length + 1}.${title}`,
        ),
        "..",
        "Public",
        "img",
        `${albums.length + 1}.${title}`,
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
            `${album.album_number}.${album.title}`,
        ),
        "..",
        "Public",
        "img",
        `${album.album_number}.${album.title}`,
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
        src,
    );

    try {
      unlinkSync(path);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    return item;
  };

  findOneAndPopulate = async (id) => {
    const [{ albumId, ...albumDataById }, album] = await Promise.all([
      this.albumData.findOne({ albumId: id }),
      this.findById(id),
    ]);

    return { albumId: album, ...albumDataById };
  };

  findAllAndPopulate = async (id) => {
    const [albumDataById, album] = await Promise.all([
      this.albumData.findAll(),
      this.findAll(),
    ]);

    return albumDataById.map(({ albumId, ...el }) => {
      const albumToSet = album.find((album) => album._id === albumId);
      return {
        albumId: albumToSet,
        ...el,
      };
    });
  };
}

export default AlbumsService;
