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
import ViewsRoute from "../Route/ViewsRouter.js";
import Cron from "../Utils/Cron.js";
import { connection } from "../Config/Firebase.js";
import logger from "../Utils/Logger/Logger.js";

const developmentApp = express();
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
connection();

Cron();

developmentApp.use(credentials);
developmentApp.use(cors(corsOptions));
developmentApp.use(express.json({ limit: "50mb" }));
developmentApp.use(express.urlencoded({ extended: true, limit: "50mb" }));
developmentApp.use(cookieParser());
developmentApp.use(apiLogger);

developmentApp.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

developmentApp.set("views", path.join(__dirname, "..", "Views", "Pages"));
developmentApp.use(express.static(path.join(__dirname, "..", "Public")));

developmentApp.use("/albums", AlbumsRoute);
developmentApp.use("/basics/slices", SlicesRoute);
developmentApp.use("/basics/regular", RegularRoute);
developmentApp.use("/email", EmailRoute);
developmentApp.use("/admin", AdminRoute);
developmentApp.use("/", ViewsRoute);

developmentApp.use((err, req, res, next) => {
  res.status(404).send({ message: `[DEV-APP]: ${err.message}` });
  logger.error({ message: `[DEV-APP]: ${err.message}` });
});

developmentApp.listen(process.env.OUT_PORT, () => {
  logger.info(
    `SERVER LIVE ON ${process.env.NODE_ENV.toLocaleUpperCase()} PORT ${process.env.OUT_PORT}`
  );
});
