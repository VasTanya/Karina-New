import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import apiLogger from "./Utils/Logger/ApiLogger.js";
import credentials from "./Config/Credentials.js";
import corsOptions from "./Config/CorsOptions.js";

import AlbumsRoute from "./Route/AlbumsRoute.js";
import RegularRoute from "./Route/RegularRoute.js";
import SlicesRoute from "./Route/SlicesRoute.js";
import EmailRoute from "./Route/EmailRoute.js";
import ViewsRoute from "./Route/ViewsRouter.js";
import AdminRoute from "./Route/AdminRoute.js";
import Cron from "./Utils/Cron.js";
import { connection } from "./Config/Firebase.js";
import logger from "./Utils/Logger/Logger.js";

const app = express();
dotenv.config();
connection();

Cron();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(apiLogger);

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "Views", "Pages"));
app.use(express.static(path.join(__dirname, "Public")));

app.use("/api/albums", AlbumsRoute);
app.use("/api/slices", SlicesRoute);
app.use("/api/regular", RegularRoute);
app.use("/api/request", EmailRoute);
app.use("/api/admin", AdminRoute);
app.use("/", ViewsRoute);

app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
  logger.error({ message: err.message });
});

export default app;
