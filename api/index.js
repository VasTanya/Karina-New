import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import apiLogger from "./Utils/Logger/ApiLogger.js";
import logger from "./Utils/Logger/Logger.js";

import credentials from "./Config/Credentials.js";
import corsOptions from "./Config/CorsOptions.js";
import Connection from "./Utils/Connection.js";

import albumsRouter from "./Route/AlbumsRoute.js";
import slicesRouter from "./Route/SlicesRoute.js";
import regularRouter from "./Route/RegularRoute.js";
import emailRouter from "./Route/EmailRoute.js";
import viewsRouter from "./Route/ViewsRouter.js";
import adminRouter from "./Route/AdminRoute.js";

const app = express();
dotenv.config();
Connection();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLogger);

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "Views", "Pages"));
app.use(express.static(path.join(__dirname, "Public")));

app.use("/api/albums", albumsRouter);
app.use("/api/slices", slicesRouter);
app.use("/api/regular", regularRouter);
app.use("/api/request", emailRouter);
app.use("/api/admin", adminRouter);
app.use("/", viewsRouter);

app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
  logger.error({ message: err.message });
});

const server = app.listen(process.env.PORT, () => {
  logger.info(`SERVER RUNNING AT ${process.env.PORT}`);
});
