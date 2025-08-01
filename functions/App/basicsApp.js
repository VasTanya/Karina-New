import express from "express";

import logger from "../Utils/Logger/Logger.js";
import common from "../Middleware/Common.js";

import RegularRoute from "../Route/RegularRoute.js";
import SlicesRoute from "../Route/SlicesRoute.js";

const basicsApp = express();
common(basicsApp);
basicsApp.use("/basics/slices", SlicesRoute);
basicsApp.use("/basics/regular", RegularRoute);

// eslint-disable-next-line no-unused-vars
basicsApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[BASICS-APP]: ${err.message}` });
  logger.error({ message: `[BASICS-APP]: ${err.message}` });
});

export default basicsApp;
