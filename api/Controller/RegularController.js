import expressAsyncHandler from "express-async-handler";
import RegularService from "../Service/RegularService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class RegularController {
  constructor() {
    this.RegularService = new RegularService();
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.editRegular = expressAsyncHandler(this.editRegular.bind(this));
    this.add = expressAsyncHandler(this.add.bind(this));
    this.deleteRegular = expressAsyncHandler(this.deleteRegular.bind(this));
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

  editRegular = async (req, res) => {
    try {
      const { _id } = req.params;
      const { display_number, title, price, src } = req.body;

      const editedItem = this.RegularService.edit({
        _id,
        display_number,
        title,
        price,
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

  add = async (req, res) => {
    try {
      const { title, price, src } = req.body;

      const addedRegular = await this.RegularService.add({
        title,
        price,
        src,
      });

      response(res, 200, addedRegular);
    } catch (error) {
      logger.error(`Error during adding: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  deleteRegular = async (req, res) => {
    try {
      const { _id } = req.params;
      const { src } = req.body;

      const deletedRegular = await this.RegularService.delete(_id, src);

      response(res, 200, deletedRegular);
    } catch (error) {
      logger.error(`Error during delete: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new RegularController();
