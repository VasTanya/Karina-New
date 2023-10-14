import expressAsyncHandler from "express-async-handler";
import SlicesService from "../Service/SlicesService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class SlicesController {
  constructor() {
    this.SlicesService = new SlicesService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.editItem = expressAsyncHandler(this.editItem.bind(this));
    this.deleteItem = expressAsyncHandler(this.deleteItem.bind(this));
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

  editItem = async (req, res) => {
    try {
      const { _id } = req.params;
      const { display_number, title, src } = req.body;

      const editedItem = this.SlicesService.edit({
        _id,
        display_number,
        title,
        src,
      });

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

      const deletedItem = this.SlicesService.delete(_id);

      response(res, 200, deletedItem);
    } catch (error) {
      logger.error(`Error during delete: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new SlicesController();
