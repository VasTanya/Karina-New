import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./Utils/logger/Logger.js";
import apiLogger from "./Utils/logger/ApiLogger.js";

import credentials from "./Config/Credentials.js";
import corsOptions from "./Config/CorsOptions.js";
import Connection from "./Utils/Connection.js";

import seedRouter from "./Route/SeedRoute.js";
import firstPhotoRouter from "./Route/FirstPhotoRoute.js";
import albumsRouter from "./Route/AlbumsRoute.js";
import slicesRouter from "./Route/SlicesRoute.js";
import regularRouter from "./Route/RegularRoute.js";

const app = express();
const dotenvConf = dotenv.config();
const connection = Connection();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLogger);

app.use("/api", seedRouter);
app.use("/api/firstPhoto", firstPhotoRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/slices", slicesRouter);
app.use("/api/regular", regularRouter);

app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
  logger.error({ message: err.message });
});

const server = app.listen(process.env.PORT, () => {
  logger.info(`SERVER RUNNING AT ${process.env.PORT}`);
});
