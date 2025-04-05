import express from "express";
import EmailRoute from "../Route/EmailRoute.js";
import logger from "../Utils/Logger/Logger.js";
import common from "../Middleware/Common.js";

const emailApp = express();
common(emailApp);
emailApp.use("/email", EmailRoute);

// eslint-disable-next-line no-unused-vars
emailApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[EMAIL-APP]: ${err.message}` });
  logger.error({ message: `[EMAIL-APP]: ${err.message}` });
});

export default emailApp;
