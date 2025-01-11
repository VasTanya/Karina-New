import express from "express";

import logger from "../Utils/Logger/Logger.js";
import common from "../Middleware/Common.js";

import AdminRoute from "../Route/AdminRoute.js";

const adminApp = express();
common(adminApp);
adminApp.use("/", AdminRoute);

adminApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[ADMIN-APP]: ${err.message}` });
  logger.error({ message: `[ADMIN-APP]: ${err.message}` });
});

export default adminApp;
