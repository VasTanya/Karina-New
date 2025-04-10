import expressAsyncHandler from "express-async-handler";
import response from "../Utils/Response.js";
import queryParser from "../Utils/QueryParser.js";
import logger from "../Utils/Logger/Logger.js";

export class BaseController {
  constructor(service, type) {
    this.service = service;
    this.type = type;
    this.getAll = expressAsyncHandler(this.getAll.bind(this));
    this.getById = expressAsyncHandler(this.getById.bind(this));
    this.editOne = expressAsyncHandler(this.editOne.bind(this));
    this.add = expressAsyncHandler(this.add.bind(this));
    this.deleteOne = expressAsyncHandler(this.deleteOne.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const query = queryParser(req.query);
      const data = await this.service.getAll(query);
      response(res, 200, data);
    } catch (error) {
      logger.error(`[${this.type}-CTRL]: Error during getAll: `, error);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const paramsId = req.params._id;

      const objectById = await this.service.getById(paramsId);
      response(res, 200, objectById);
    } catch (error) {
      logger.error(`[${this.type}-CTRL]: Error during getById: `, error);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  editOne = async (req, res) => {
    try {
      const { _id } = req.params;
      const { display_number, title, price, src } = req.body;

      const editedObject = await this.service.edit({
        _id,
        display_number,
        title,
        price,
        src,
        ...(req.file && { file: req.file }),
      });

      response(res, 200, editedObject);
    } catch (error) {
      logger.error(`[${this.type}-CTRL]: Error during editOne: `, error);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  add = async (req, res) => {
    try {
      const { title, price, src } = req.body;

      const addedObject = await this.service.add({
        title,
        price,
        src,
        ...(req.file && { file: req.file }),
      });

      response(res, 200, addedObject);
    } catch (error) {
      logger.error(`[${this.type}-CTRL]: Error during add: `, error);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const { _id } = req.params;
      const { src } = req.body;

      const { status, message } = await this.service.delete(_id, src);

      response(res, status, { message });
    } catch (error) {
      logger.error(`[${this.type}-CTRL]: Error during deleteOne: `, error);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };
}
