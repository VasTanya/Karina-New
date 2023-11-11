import expressAsyncHandler from "express-async-handler";
import EmailService from "../Service/EmailService.js";
import logger from "../Utils/Logger/Logger.js";
import response from "../Utils/Response.js";

class EmailController {
  constructor() {
    this.EmailService = new EmailService();
    this.sendRequest = expressAsyncHandler(this.sendRequest.bind(this));
  }

  sendRequest = async (req, res) => {
    try {
      const message = await this.EmailService.sendRequest(req.body);

      response(res, 200, message);
    } catch (error) {
      logger.error(`CONTROLLER Error sending email: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };

  sendRequestYourDesign = async (req, res) => {
    try {
      const message = await this.EmailService.sendRequestYourDesign(req.body);

      response(res, 200, message);
    } catch (error) {
      logger.error(`CONTROLLER Error sending email: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };
}

export default new EmailController();
