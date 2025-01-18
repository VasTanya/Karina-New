import nodemailer from "nodemailer";
import expressAsyncHandler from "express-async-handler";
import { requestTemplate } from "../Public/template/requestTemplate.js";
import { myDesignTemplate } from "../Public/template/myDesignTemplate.js";
import logger from "../Utils/Logger/Logger.js";

const errorMessage =
  "Failed to send request. Please check your connection and try again";

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: process.env.MAIL_ENCRYPTION === "tls",
      auth: {
        user: process.env.ADMIN_MAIL_USERNAME,
        pass: process.env.ADMIN_MAIL_PASSWORD,
      },
      logger,
    });
    this.sendRequest = expressAsyncHandler(this.sendRequest.bind(this));
    this.sendRequestMyDesign = expressAsyncHandler(
      this.sendRequestMyDesign.bind(this)
    );
  }

  sendRequest = async (data) => {
    try {
      const template = requestTemplate(data);
      const message = await this.sendEmail("request", data, template);
      return message;
    } catch (error) {
      logger.error("[EMAIL-MNGR]: Error sending request", error);
      return {
        status1: "error",
        message: errorMessage,
      };
    }
  };

  sendRequestMyDesign = async (data) => {
    try {
      const template = myDesignTemplate(data);
      const message = await this.sendEmail("order", data, template);
      return message;
    } catch (error) {
      logger.error("[EMAIL-MNGR]: Error sending myDesign", error);
      return {
        status1: "error",
        message: errorMessage,
      };
    }
  };

  sendEmail = async (type, data, template) => {
    try {
      await this.transporter.sendMail({
        from: process.env.ADMIN_MAIL_USERNAME,
        to: process.env.SUPPORT_MAIL_USERNAME,
        subject:
          type === "request"
            ? `New Request For ${data.cakeCode}`
            : `New design request from ${data.email}`,
        html: template,
      });

      return {
        status1: "successful",
        message:
          type === "request"
            ? `Request for ${data.cakeCode} has been sent!`
            : "Your design has been sent",
      };
    } catch (error) {
      logger.error(error);
      return {
        status1: "error",
        message: data?.cakeCode
          ? `Request for ${data.cakeCode} has failed! Try again later!`
          : `Request failed! Try again later!`,
      };
    }
  };
}

export default EmailManager;
