import logger from "../Utils/Logger/Logger.js";
import DbService from "./DbService.js";

export class BaseService extends DbService {
  constructor(serviceName, logType) {
    super(serviceName);
    this.logType = logType;
    this.dataTitle = this.setDataTitle(serviceName);
  }

  getAll = async () => {
    try {
      return this.find();
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during getAll: `, error);
      return [];
    }
  };

  getById = async (id) => {
    try {
      return this.findById(id);
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during getById: `, error);
      return {};
    }
  };

  edit = async (data) => {
    try {
      const updatedData = await this.findByIdAndUpdate(data._id, data);

      if (!updatedData) {
        throw new Error(`${this.dataTitle} not found`);
      }

      return updatedData;
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during edit: `, error);
      return {};
    }
  };

  add = async (data) => {
    try {
      const dataLength = await this.count();

      if (data.file) {
        const uploadedFilePaths = await this.uploadImage(data.file, data.src);
        data.src = uploadedFilePaths;
      } else {
        data.src = {
          sm: "noPhoto (sm).jpeg",
          md: "noPhoto (md).jpeg",
          lg: "noPhoto (lg).jpeg",
        };
      }

      await this.create({
        display_number: dataLength + 1,
        title: data.title,
        price: data.price,
        src: data.src,
      });

      return { message: `${this.dataTitle} created` };
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during add: `, error);
      return {};
    }
  };

  delete = async (id) => {
    try {
      const item = await this.findByIdAndDelete(id);

      if (!item) {
        return {
          status: 404,
          message: "Item not found",
        };
      }

      return item;
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during delete: `, error);
      return {};
    }
  };

  setDataTitle = (collectionName) => {
    try {
      if (!collectionName) return "";

      const singularName = collectionName.endsWith("s")
        ? collectionName.slice(0, -1)
        : collectionName;

      return (
        singularName.charAt(0).toUpperCase() +
        singularName.slice(1).toLowerCase()
      );
    } catch (error) {
      logger.error(`[${this.logType}-SRV]: Error during setDataTitle: `, error);
    }
  };
}
