import expressAsyncHandler from "express-async-handler";
import RegularService from "../Service/RegularService.js";
import logger from "../Utils/logger/logger.js";
import response from "../Utils/Response.js";

class RegularController {
  constructor() {
    this.RegularService = new RegularService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;

      const regulars = await this.RegularService.getAll(page, size);
      response(res, 200, regulars);
    } catch (error) {
      logger.error(`Error during getAll: ${error}`);
      response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const paramsId = req.params._id;

      const regularById = await this.RegularService.getById(paramsId);
      response(res, 200, regularById);
    } catch (error) {
      logger.error(`Error during getById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new RegularController();
