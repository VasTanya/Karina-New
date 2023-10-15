import expressAsyncHandler from "express-async-handler";
import AlbumsService from "../Service/AlbumsService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

class AlbumsController {
  constructor() {
    this.AlbumsService = new AlbumsService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.getItemById = expressAsyncHandler(this.getItemById.bind(this));
    this.firstPhoto = expressAsyncHandler(this.firstPhoto.bind(this));
    this.search = expressAsyncHandler(this.search.bind(this));
    this.editAlbum = expressAsyncHandler(this.editAlbum.bind(this));
    this.editItem = expressAsyncHandler(this.editItem.bind(this));
    this.deleteAlbum = expressAsyncHandler(this.deleteAlbum.bind(this));
    this.deleteItem = expressAsyncHandler(this.deleteItem.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const albums = await this.AlbumsService.getAll();
      response(res, 200, albums);
    } catch (error) {
      logger.error(`Error during getAll: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const { _id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const size =
        req.query.size === "all" ? -1 : parseInt(req.query.size) || 10;

      const albumById = await this.AlbumsService.getById(_id, page, size);
      response(res, 200, albumById);
    } catch (error) {
      logger.error(`Error during getById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  getItemById = async (req, res) => {
    try {
      const { _id, item } = req.params;

      const albumDataItem = await this.AlbumsService.getItemById(_id, item);
      response(res, 200, albumDataItem);
    } catch (error) {
      logger.error(`Error during getItemById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  firstPhoto = async (req, res) => {
    try {
      const firstPhoto = await this.AlbumsService.firstPhoto();

      response(res, 200, firstPhoto);
    } catch (error) {
      logger.error(`Error during firstPhoto: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  search = async (req, res) => {
    try {
      const { album_number, display_number } = req.query;

      const search = await this.AlbumsService.search(
        album_number,
        display_number
      );

      response(res, 200, search);
    } catch (error) {
      logger.error(`Error during search: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  editAlbum = async (req, res) => {
    try {
      const { _id } = req.params;
      const { album_number, title } = req.body;

      const editedAlbum = await this.AlbumsService.editAlbum({
        _id: _id,
        album_number: parseInt(album_number),
        title: title,
      });

      response(res, 200, editedAlbum);
    } catch (error) {
      logger.error(`Error during editing album: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  editItem = async (req, res) => {
    try {
      const { albumId, item } = req.params;
      const { display_number, src } = req.body;

      const editedItem = this.AlbumsService.editItem({
        albumId,
        item,
        display_number,
        src,
      });

      response(res, 200, editedItem);
    } catch (error) {
      logger.error(`Error during editing item: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  addAlbum = async (req, res) => {
    try {
      const { title } = req.body;

      const addedAlbum = this.AlbumsService.addAlbum(title);

      response(res, 200, addedAlbum);
    } catch (error) {
      logger.error(`Error during editing item: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  addItem = async (req, res) => {
    try {
      const { albumId } = req.params;
      const { tag, src } = req.body;

      const createdItem = this.AlbumsService.addItem({
        albumId,
        tag,
        src,
      });

      response(res, 200, createdItem);
    } catch (error) {
      logger.error(`Error during editing item: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  deleteAlbum = async (req, res) => {
    try {
      const { _id } = req.params;

      const deletedAlbum = await this.AlbumsService.deleteAlbum(_id);

      response(res, 200, deletedAlbum);
    } catch (error) {
      logger.error(`Error during deleting album: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { _id, item } = req.params;
      const { src } = req.body;

      const deletedItem = await this.AlbumsService.deleteItem(_id, item, src);

      response(res, 200, deletedItem);
    } catch (error) {
      logger.error(`Error during deleting item: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new AlbumsController();
