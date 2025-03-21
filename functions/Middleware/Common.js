import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "../Config/CorsOptions.js";
import credentials from "../Config/Credentials.js";
import apiLogger from "../Utils/Logger/ApiLogger.js";
import requestLogger from "../Utils/Logger/RequestLogger.js";

const common = (app) => {
  app.use(credentials);
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(apiLogger);
  app.use(requestLogger);
};

export default common;
