import express from "express";

import logger from "../Utils/Logger/Logger.js";
import common from "../Middleware/Common.js";

import AlbumsRoute from "../Route/AlbumsRoute.js";

const albumsApp = express();
common(albumsApp);

albumsApp.use("/albums", AlbumsRoute);

albumsApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[ALBUMS-APP]: ${err.message}` });
  logger.error({ message: `[ALBUMS-APP]: ${err.message}` });
});

export default albumsApp;
