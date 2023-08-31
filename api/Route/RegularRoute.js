import { Router } from "express";
import RegularController from "../Controller/RegularController.js";

const regularRouter = Router();
const { getAll, getById, editItem, deleteItem } = RegularController;

regularRouter.get("/", getAll);

regularRouter.get("/:_id", getById);

regularRouter.get("/:_id/edit", editItem);

regularRouter.get("/delete", deleteItem);

export default regularRouter;
