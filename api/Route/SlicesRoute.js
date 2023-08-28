import { Router } from "express";
import SlicesController from "../Controller/SlicesController.js";

const slicesRouter = Router();
const { getAll, getById } = SlicesController;

slicesRouter.get("/", getAll);

slicesRouter.get("/:_id", getById);

export default slicesRouter;
