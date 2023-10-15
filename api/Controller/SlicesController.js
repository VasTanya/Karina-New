import expressAsyncHandler from "express-async-handler";
import SlicesService from "../Service/SlicesService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class SlicesController {
  constructor() {
    this.SlicesService = new SlicesService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.editSlice = expressAsyncHandler(this.editSlice.bind(this));
    this.add = expressAsyncHandler(this.add.bind(this));
    this.deleteSlice = expressAsyncHandler(this.deleteSlice.bind(this));
  }

  getAll = async (req, res) => {
    try {
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

  editSlice = async (req, res) => {
    try {
      const { _id } = req.params;
      const { display_number, title, price, src } = req.body;

      const editedSlice = this.SlicesService.edit({
        _id,
        display_number,
        title,
        price,
        src,
      });

      response(res, 200, editedSlice);
    } catch (error) {
      logger.error(`Error during edit: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  add = async (req, res) => {
    try {
      const { title, price, src } = req.body;

      const addedSlice = await this.SlicesService.add({
        title,
        price,
        src,
      });

      response(res, 200, addedSlice);
    } catch (error) {
      logger.error(`Error during adding: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  deleteSlice = async (req, res) => {
    try {
      const { _id } = req.params;
      const { src } = req.body;

      const deletedSlice = this.SlicesService.delete(_id, src);

      response(res, 200, deletedSlice);
    } catch (error) {
      logger.error(`Error during delete: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new SlicesController();
