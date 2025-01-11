import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "../Config/CorsOptions.js";
import credentials from "../Config/Credentials.js";
import apiLogger from "../Utils/Logger/ApiLogger.js";

const common = (app) => {
  app.use(credentials);
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  app.use(apiLogger);
};

export default common;
