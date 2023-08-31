import expressAsyncHandler from "express-async-handler";
import RegularService from "../Service/RegularService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class RegularController {
  constructor() {
    this.RegularService = new RegularService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.editItem = expressAsyncHandler(this.editItem.bind(this));
    this.deleteItem = expressAsyncHandler(this.deleteItem.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const regulars = await this.RegularService.getAll();
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

  editItem = async (req, res) => {
    try {
      const { display_number, title, src } = req.body;

      const data = {
        display_number: display_number,
        title: title,
        src: src,
      };

      const editedItem = this.RegularService.edit(data);

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

      const deletedItem = this.RegularService.delete(_id);

      response(res, 200, deletedItem);
    } catch (error) {
      logger.error(`Error during delete: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new RegularController();
