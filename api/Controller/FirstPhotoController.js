import expressAsyncHandler from "express-async-handler";
import logger from "../Utils/logger/logger.js";
import FirstPhotoService from "../Service/FirstPhotoService.js";
import response from "../Utils/Response.js";

class FirstPhotoController {
  constructor() {
    this.FirstPhotoService = new FirstPhotoService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const page = parseInt(req.query.params) || 1;
      const size = parseInt(req.query.params) || 10;

      const firstPhoto = await this.FirstPhotoService.getAll(page, size);
      response(res, 200, firstPhoto);
    } catch (error) {
      logger.error(`Error during getAll ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const paramsId = req.params._id;

      const firstPhotoById = await this.FirstPhotoService.getById(paramsId);
      response(res, 200, firstPhotoById);
    } catch (error) {
      logger.error(`Error during getById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new FirstPhotoController();
