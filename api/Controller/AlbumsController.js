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
    this.editItem = expressAsyncHandler(this.editItem.bind(this));
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
      const size = parseInt(req.query.size) || 10;

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

      const id = new ObjectId(_id);
      const itemId = new ObjectId(item);

      const albumDataItem = await this.AlbumsService.getItemById(id, itemId);
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

  editItem = async (req, res) => {
    try {
      const { display_number, title, src } = req.body;

      const data = {
        display_number: display_number,
        title: title,
        src: src,
      };

      const editedItem = await this.AlbumsService.edit(data);

      response(res, 200, editedItem);
    } catch (error) {
      logger.error(`Error during edit: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { _id } = req.body;

      const deletedItem = await this.AlbumsService.delete(_id);

      response(res, 200, deletedItem);
    } catch (error) {
      logger.error(`Error during delete: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new AlbumsController();
