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
    this.firstPhoto = expressAsyncHandler(this.firstPhoto.bind(this));
    this.search = expressAsyncHandler(this.search.bind(this));
    this.editAlbum = expressAsyncHandler(this.editAlbum.bind(this));
    this.editItem = expressAsyncHandler(this.editItem.bind(this));
    this.deleteAlbum = expressAsyncHandler(this.deleteAlbum.bind(this));
    this.deleteItem = expressAsyncHandler(this.deleteItem.bind(this));
  }

  getAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const albums = await this.AlbumsService.getAll(page, size);
      response(res, 200, albums);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during getAll: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  getById = async (req, res) => {
    try {
      const { _id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const size =
        req.query.size === "all" ? -1 : parseInt(req.query.size) || 10;

      const albumById = await this.AlbumsService.getById(_id, page, size);
      response(res, 200, albumById);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during getById: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  getItemById = async (req, res) => {
    try {
      const { _id, item } = req.params;

      const albumDataItem = await this.AlbumsService.getItemById(_id, item);
      response(res, 200, albumDataItem);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during getItemById: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  firstPhoto = async (req, res) => {
    try {
      const firstPhoto = await this.AlbumsService.firstPhoto();

      response(res, 200, firstPhoto);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during firstPhoto: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  search = async (req, res) => {
    try {
      const { album_number, display_number } = req.query;

      const search = await this.AlbumsService.search(
        parseInt(album_number),
        parseInt(display_number)
      );

      response(res, 200, search);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during search: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  editAlbum = async (req, res) => {
    try {
      const { _id } = req.params;
      const { album_number, title } = req.body;

      const editedAlbum = await this.AlbumsService.editAlbum(_id, {
        album_number: parseInt(album_number),
        title: title,
      });

      response(res, 200, editedAlbum);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during editAlbum: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  editItem = async (req, res) => {
    try {
      const { albumId, item } = req.params;
      const { display_number, src } = req.body;

      const editedItem = await this.AlbumsService.editItem({
        albumId,
        item,
        display_number,
        src,
        ...(req.file && { file: req.file }),
      });

      response(res, 200, editedItem);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during editItem: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  addAlbum = async (req, res) => {
    try {
      const { title } = req.body;

      const addedAlbum = await this.AlbumsService.addAlbum(title);

      response(res, 200, addedAlbum);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during addAlbum: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  addItem = async (req, res) => {
    try {
      const { albumId } = req.params;
      const { tag, src } = req.body;

      const createdItem = await this.AlbumsService.addItem({
        albumId,
        tag,
        src,
        ...(req.file && { file: req.file }),
      });

      response(res, 200, createdItem);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during addItem: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  deleteAlbum = async (req, res) => {
    try {
      const { _id } = req.params;

      const deletedAlbum = await this.AlbumsService.deleteAlbum(_id);

      response(res, 200, deletedAlbum);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during deleteAlbum: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { _id, item } = req.params;

      const deletedItem = await this.AlbumsService.deleteItem(_id, item);

      response(res, 200, deletedItem);
    } catch (error) {
      logger.error(`[ALB-CTRL]: Error during deleteItem: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };
}

export default new AlbumsController();
