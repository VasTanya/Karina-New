import { v4 as uuid4 } from "uuid";
import DbService from "./DbService.js";
import logger from "../Utils/Logger/Logger.js";
import { NO_PHOTO_URLS } from "../Utils/Constants.js";

class AlbumsService extends DbService {
  constructor() {
    super("albums");
    this.albumData = new DbService("albumData");
  }

  getAll = async (query) => {
    try {
      return this.find(query);
    } catch (error) {
      logger.error("[ALB-SRV]: Error during getAll", error);
      return [];
    }
  };

  firstPhoto = async ({ url, select }) => {
    try {
      const albumData = await this.albumData.collection.get();

      const firstPhotos = albumData.docs
        .map((doc) => {
          const { albumId, data } = doc.data();
          const firstPhoto = Array.isArray(data)
            ? data.filter((el) => el.tag === "firstPhoto")
            : [];
          return firstPhoto.length > 0 ? { albumId, firstPhoto } : null;
        })
        .filter(Boolean);

      const albumIds = firstPhotos.map((el) => el.albumId);
      const albumPromises = albumIds.map((id) =>
        this.findById(id, { url, select })
      );
      const albums = await Promise.all(albumPromises);

      const albumMap = albums.reduce((acc, album) => {
        acc[album._id] = album;
        return acc;
      }, {});

      const firstPhotoWithAlbum = await Promise.all(
        firstPhotos.map(async (el) => {
          const album = albumMap[el.albumId];
          const firstPhoto = await Promise.all(
            el.firstPhoto.map(async ({ src, ...rest }) => ({
              ...rest,
              src: await this.mapUrls(src, select),
            }))
          );
          return { album, firstPhotos: firstPhoto };
        })
      );

      return firstPhotoWithAlbum.sort(
        (a, b) => a.album.album_number - b.album.album_number
      );
    } catch (error) {
      logger.error("[ALB-SRV]: Error during firstPhoto", error);
      return [];
    }
  };

  getById = async (id, { page = 1, size = 10, url, select }) => {
    try {
      const skip = (page - 1) * size;

      // eslint-disable-next-line no-unused-vars
      const [{ albumId, ...albumDataById }, album] = await Promise.all([
        this.albumData.findOne({ albumId: id }, { url: false }),
        this.findById(id, { url: false }),
      ]);

      if (!albumDataById) return {};

      const paginatedArray =
        size === -1
          ? albumDataById.data
          : albumDataById.data.slice(skip, skip + size);

      const paginatedAlbumData = await Promise.all(
        paginatedArray.map(async ({ src, ...rest }) => {
          const mappedSrc = await this.mapUrls(src, select);

          return { ...rest, src: mappedSrc };
        })
      );

      return { albumId: album, ...albumDataById, data: paginatedAlbumData };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during getById", error);
      return {};
    }
  };

  getItemById = async (id, item) => {
    try {
      const albumData = await this.albumData.findOne({ albumId: id });

      if (!albumData) return {};

      const albumDataItem = albumData.data.find((el) => el._id === item);

      return albumDataItem;
    } catch (error) {
      logger.error("[ALB-SRV]: Error during getItemById", error);
      return {};
    }
  };

  search = async (query) => {
    const { album_number, display_number, ...rest } = query;
    const albumNumber = album_number;
    const displayNumber = display_number;

    try {
      let result = [];

      if (!displayNumber) {
        const albums = await this.findAll({ url: false });
        result = albums
          .filter((album) =>
            album.album_number.toString().includes(albumNumber.toString())
          )
          .sort((a, b) => a.album_number - b.album_number);

        if (result.length === 0) {
          return { message: `No result for album number ${albumNumber}` };
        }

        return result;
      } else {
        const { _id, ...album } = await this.findOne(
          { album_number: albumNumber },
          { url: false }
        );

        const albumData = await this.albumData.findOne(
          { albumId: _id },
          { url: false }
        );

        const matchingData = albumData.data.find((data) =>
          data.display_number.toString().includes(displayNumber.toString())
        );

        const mappedUrls = await this.mapUrls(matchingData.src, rest.select);
        matchingData.src = mappedUrls;

        if (matchingData) {
          result.push({
            album_number: album.album_number,
            matching_data: matchingData,
          });
        }

        if (result.length === 0) {
          return {
            message: `No result for album number ${albumNumber} and display number ${displayNumber}`,
          };
        }

        return result;
      }
    } catch (error) {
      logger.error("[ALB-SRV]: Error during search", error);
      return [];
    }
  };

  editAlbum = async (id, data) => {
    try {
      await this.findByIdAndUpdate(id, data);

      return { message: "Album updated successfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during editAlbum", error);
      return { message: "Failed to edit album. Please try again later." };
    }
  };

  editItem = async (data) => {
    try {
      const albumDataSnapshot = await this.albumData.collection
        .where("albumId", "==", data.albumId)
        .limit(1)
        .get();

      if (albumDataSnapshot.empty) {
        return { message: "Album not found" };
      }

      const albumDataDoc = albumDataSnapshot.docs[0];
      const albumDataRef = albumDataDoc.ref;
      const albumData = albumDataDoc.data();

      const itemIndex = albumData.data.findIndex(
        (item) => item._id === data.item
      );

      if (itemIndex === -1) {
        return { message: "Item not found" };
      }

      if (data.file) {
        const uploadedFilePaths = await this.uploadImage(data.file, data.src);
        data.src = uploadedFilePaths;
      }

      albumData.data[itemIndex] = {
        ...albumData.data[itemIndex],
        display_number: data.display_number,
        src: data.src ? data.src : albumData.data[itemIndex].src,
        ...(albumData.data[itemIndex].tag
          ? { tag: albumData.data[itemIndex].tag }
          : {}),
      };

      await albumDataRef.update({ data: albumData.data });
      return { message: "Item updated successfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during editItem", error);
      return { message: "Failed to edit item. Please try again later." };
    }
  };

  addAlbum = async (title) => {
    try {
      const albumsCount = await this.count();

      try {
        const newAlbum = await this.create({
          album_number: albumsCount + 1,
          title,
        });

        await this.albumData.create({
          albumId: newAlbum._id,
          data: [],
          count: 0,
        });
      } catch (error) {
        logger.error("[ALB-SRV]: Error creating album", error);
      }

      return { message: "Album created succesfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during addAlbum", error);
      return { message: "Failed to create album. Please try again later." };
    }
  };

  addItem = async (data) => {
    try {
      const albumDataSnapshot = await this.albumData.collection
        .where("albumId", "==", data.albumId)
        .limit(1)
        .get();

      const albumDataDoc = albumDataSnapshot.docs[0];
      const albumDataRef = albumDataDoc.ref;
      const albumData = albumDataDoc.data();

      if (data.file) {
        const uploadedFilePaths = await this.uploadImage(data.file, data.src);
        data.src = uploadedFilePaths;
      } else {
        data.src = NO_PHOTO_URLS;
      }

      const newItem = {
        _id: uuid4(),
        display_number: albumData.data.length + 1,
        src: data.src,
        ...(data.tag === "$true" ? { tag: "firstPhoto" } : {}),
      };

      albumData.data.push(newItem);

      await albumDataRef.update({
        count: albumData.data.length,
        data: albumData.data,
      });
      return { message: "Album item created successfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during addItem", error);
      return {
        message: "Failed to create album item. Please try again later.",
      };
    }
  };

  deleteAlbum = async (id) => {
    try {
      await Promise.all([
        this.findByIdAndDelete(id),
        this.albumData.findOneAndDelete({ albumId: id }),
      ]);

      return { message: "Album deleted succesfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during deleteAlbum", error);
      return { message: "Failed to delete album. Please again try later" };
    }
  };

  deleteItem = async (id, itemId) => {
    try {
      const albumDataSnapshot = await this.albumData.collection
        .where("albumId", "==", id)
        .limit(1)
        .get();

      if (albumDataSnapshot.empty) {
        return { message: "Album not found" };
      }

      const albumDataDoc = albumDataSnapshot.docs[0];
      const albumDataRef = albumDataDoc.ref;
      const albumData = albumDataDoc.data();

      const itemIndex = albumData.data.findIndex((item) => item._id === itemId);

      if (itemIndex === -1) {
        return { message: "Item not found" };
      }

      albumData.data.splice(itemIndex, 1);

      await albumDataRef.update({
        count: albumData.data.length,
        data: albumData.data,
      });
      return { message: "Item deleted successfully" };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during deleteItem", error);
      return { message: "Failed to delete item. Please try again later." };
    }
  };

  findOneAndPopulate = async (id, query) => {
    try {
      const [{ albumId, ...albumDataById }, album] = await Promise.all([
        this.albumData.findOne({ albumId: id }, query),
        this.findById(id, query),
      ]);

      return { albumId: album, ...albumDataById };
    } catch (error) {
      logger.error("[ALB-SRV]: Error during findOneAndPopulate", error);
      return null;
    }
  };

  findAllAndPopulate = async (query) => {
    try {
      const [albumDataById, album] = await Promise.all([
        this.albumData.findAll(query),
        this.findAll(query),
      ]);

      return albumDataById.map(({ albumId, ...el }) => {
        const albumToSet = album.find((album) => album._id === albumId);
        return {
          albumId: albumToSet,
          ...el,
        };
      });
    } catch (error) {
      logger.error("[ALB-SRV]: Error during findAllAndPopulate", error);
      return [];
    }
  };
}

export default AlbumsService;
