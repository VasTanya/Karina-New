import { Router } from "express";
import SlicesController from "../Controller/SlicesController.js";

const slicesRouter = Router();
const slicesInstance = SlicesController;

slicesRouter.get("/", slicesInstance.getAll);

slicesRouter.get("/:_id", slicesInstance.getById);

export default slicesRouter;
