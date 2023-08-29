import expressAsyncHandler from "express-async-handler";
import AlbumsService from "../Service/AlbumsService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class AlbumsController {
  constructor() {
    this.AlbumsService = new AlbumsService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.getItemById = expressAsyncHandler(this.getItemById.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      const albums = await this.AlbumsService.getAll(page, size);
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
      const paramsId = req.params._id;
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      const albumById = await this.AlbumsService.getById(paramsId, page, size);
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
      const paramsId = req.params._id;
      const paramsItem = req.params.item;

      const albumDataItem = await this.AlbumsService.getItemById(
        paramsId,
        paramsItem
      );
      response(res, 200, albumDataItem);
    } catch (error) {
      logger.error(`Error during getItemById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new AlbumsController();
