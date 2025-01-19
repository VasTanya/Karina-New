import { Router } from "express";

export class BaseRouter {
  constructor() {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }
}
