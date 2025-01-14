import expressAsyncHandler from "express-async-handler";
import logger from "../Utils/Logger/Logger.js";
import response from "../Utils/Response.js";
import EmailManager from "../Manager/EmailManager.js";

class EmailController extends EmailManager {
  constructor() {
    super();
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
    try {
      const message = await this.sendRequestMyDesign({
        file: req.files[0].originalname,
        ...req.body,
      });

      response(res, 200, message);
    } catch (error) {
      logger.error(`Error sending order: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };
}

export default new EmailController();
