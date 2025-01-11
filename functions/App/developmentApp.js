import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import apiLogger from "../Utils/Logger/ApiLogger.js";
import credentials from "../Config/Credentials.js";
import corsOptions from "../Config/CorsOptions.js";

import AlbumsRoute from "../Route/AlbumsRoute.js";
import RegularRoute from "../Route/RegularRoute.js";
import SlicesRoute from "../Route/SlicesRoute.js";
import EmailRoute from "../Route/EmailRoute.js";
import AdminRoute from "../Route/AdminRoute.js";
import Cron from "../Utils/Cron.js";
import { connection } from "../Config/Firebase.js";
import logger from "../Utils/Logger/Logger.js";

const devApp = express();
dotenv.config();
connection();

Cron();

devApp.use(credentials);
devApp.use(cors(corsOptions));
devApp.use(express.json({ limit: "50mb" }));
devApp.use(express.urlencoded({ extended: true, limit: "50mb" }));
devApp.use(cookieParser());
devApp.use(apiLogger);

devApp.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

devApp.set("views", path.join(__dirname, "Views", "Pages"));
devApp.use(express.static(path.join(__dirname, "Public")));

devApp.use("/albums", AlbumsRoute);
devApp.use("/slices", SlicesRoute);
devApp.use("/regular", RegularRoute);
devApp.use("/request", EmailRoute);
devApp.use("/admin", AdminRoute);

devApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[DEV-APP]: ${err.message}` });
  logger.error({ message: `[DEV-APP]: ${err.message}` });
});

export default devApp;
