import mongoose from "mongoose";
import logger from "./logger/logger.js";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("CONNECTED TO DB");
    return true;
  } catch (error) {
    logger.error(`FAILED TO CONNECT: ${error.message}`);
    return false;
  }
};

export default Connection;
