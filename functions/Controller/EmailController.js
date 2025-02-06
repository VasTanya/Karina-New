import expressAsyncHandler from "express-async-handler";
import { v4 as uuid } from "uuid";
import logger from "../Utils/Logger/Logger.js";
import response from "../Utils/Response.js";
import EmailManager from "../Manager/EmailManager.js";
import { storage } from "../Config/Firebase.js";

class EmailController extends EmailManager {
  constructor() {
    super();
    this.storage = storage;
    this.request = expressAsyncHandler(this.request.bind(this));
    this.requestMyDesign = expressAsyncHandler(this.requestMyDesign.bind(this));
  }

  request = async (req, res) => {
    try {
      const message = await this.sendRequest(req.body);

      response(res, 200, message);
    } catch (error) {
      logger.error(`Error sending request: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };

  requestMyDesign = async (req, res) => {
    const { img, ...rest } = req.body;

    try {
      let fileStoragePath;
      if (req.file) {
        const resizedFile = await this.storage.resizeOneAndConvert(req.file);
        const filePath = `MyDesign/${uuid()}`;
        const uploadedImage = await storage.upload(resizedFile, filePath);
        fileStoragePath = uploadedImage;
      } else if (img) {
        fileStoragePath = img;
      } else {
        response(res, 500, {
          message: "Image failed to upload. Try again later",
        });
      }

      const imgUrl = await storage.getUrl(fileStoragePath, true);
      const message = await this.sendRequestMyDesign({ img: imgUrl, ...rest });

      response(res, 200, message);
    } catch (error) {
      logger.error(`Error sending order: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };
}

export default new EmailController();
