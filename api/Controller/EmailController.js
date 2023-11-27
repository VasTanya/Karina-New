import expressAsyncHandler from "express-async-handler";
import EmailService from "../Service/EmailService.js";
import logger from "../Utils/Logger/Logger.js";
import response from "../Utils/Response.js";

class EmailController {
  constructor() {
    this.EmailService = new EmailService();
    this.sendRequest = expressAsyncHandler(this.sendRequest.bind(this));
    this.sendRequestMyDesign = expressAsyncHandler(
      this.sendRequestMyDesign.bind(this)
    );
  }

  sendRequest = async (req, res) => {
    try {
      const message = await this.EmailService.sendRequest(req.body);

      response(res, 200, message);
    } catch (error) {
      logger.error(`Error sending request: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };

  sendRequestMyDesign = async (req, res) => {
    try {
      const message = await this.EmailService.sendRequestMyDesign({
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
