import { Router } from "express";
import SlicesController from "../Controller/SlicesController.js";

const slicesRouter = Router();
const { getAll, getById, editItem, deleteItem } = SlicesController;

slicesRouter.get("/", getAll);

slicesRouter.get("/:_id", getById);

slicesRouter.get("/:_id.edit", editItem);

slicesRouter.get("/delete", deleteItem);

export default slicesRouter;
