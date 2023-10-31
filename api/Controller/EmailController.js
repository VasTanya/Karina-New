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
    const { name, phone, email, size, filling, cakeCode, img } = req.body;

    const mailData = {
      name,
      phone,
      email,
      size,
      filling,
      cakeCode,
      img,
    };

    try {
      const message = await this.EmailService.sendRequest(mailData);
      response(res, 200, message);
    } catch (error) {
      logger.error(`CONTROLLER Error sending email: ${error}`);
      response(res, 500, { error: "Error sending email" });
    }
  };
}

export default new EmailController();
