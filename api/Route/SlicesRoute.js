import { Router } from "express";
import SlicesController from "../Controller/SlicesController.js";
import upload from "../Utils/Multer.js";

const slicesRouter = Router();
const { getAll, getById, editItem, deleteItem } = SlicesController;

slicesRouter.get("/", getAll);

slicesRouter.get("/:_id", getById);

slicesRouter.put("/:_id/edit", upload.array("img"), editItem);

slicesRouter.delete("/delete", deleteItem);

export default slicesRouter;
