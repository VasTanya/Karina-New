import nodemailer from "nodemailer";
import logger from "../Utils/Logger/Logger.js";

const mailer = async (type, data, template) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: process.env.MAIL_ENCRYPTION === "tls",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    logger: true,
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_TO,
      subject:
        type === "request"
          ? `New Request For ${data.cakeCode}`
          : `New design request from ${data.email}`,
      html: template,
    });

    return {
      message:
        type === "request"
          ? `Request for ${data.cakeCode} has been sent!`
          : "Your design has been sent",
    };
  } catch (error) {
    logger.error(error);
    return {
      message: data?.cakeCode
        ? `Request for ${data.cakeCode} has failed! Try again later!`
        : `Request failed! Try again later!`,
    };
  }
};

export default mailer;
