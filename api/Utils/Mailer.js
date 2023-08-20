import nodemailer from "nodemailer";
import logger from "./logger/logger";

const mailer = async (data) => {
  const trasporter = nodemailer;

  const mailOptions = {};

  try {
    await trasporter.sendMail(mailOptions);
    logger.info("MAIL HAS BEEN SENT");
  } catch (error) {
    logger.error(`Error sending mail: ${error}`);
  }
};

export default mailer;
