import { Router } from "express";
import upload from "../Middleware/Multer.js";

export class BaseRouter {
  constructor() {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}
