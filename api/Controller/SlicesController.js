import expressAsyncHandler from "express-async-handler";
import SlicesService from "../Service/SlicesService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/logger/logger.js";

class SlicesController {
  constructor() {
    this.SlicesService = new SlicesService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
  }

  getAll = async (req, res) => {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const size = parseInt(req.query.size) || 10;

      const slices = await this.SlicesService.getAll();
      response(res, 200, slices);
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

      const sliceById = await this.SlicesService.getById(paramsId);
      response(res, 200, sliceById);
    } catch (error) {
      logger.error(`Error during getById: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new SlicesController();
