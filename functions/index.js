import * as functions from "firebase-functions/v2";
import express from "express";
import logger from "./Utils/Logger/Logger.js";
import app from "./app.js";

const server = express();

if (process.env.ENVIRONMENT === "DEV") {
  app.listen(process.env.PORT, () => {
    logger.info(
        `SERVER LIVE ON ${process.env.ENVIRONMENT} PORT ${process.env.PORT}`,
    );
  });
} else {
  server.use(app);
  exports.api = functions.https.onRequest(server);
  logger.info(`SERVER LIVE ON ${process.env.ENVIRONMENT}`);
}
