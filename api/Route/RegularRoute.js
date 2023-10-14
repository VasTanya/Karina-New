import { Router } from "express";
import RegularController from "../Controller/RegularController.js";
import upload from "../Utils/Multer.js";

const regularRouter = Router();
const { getAll, getById, editItem, deleteItem } = RegularController;

regularRouter.get("/", getAll);

regularRouter.get("/:_id", getById);

regularRouter.put("/:_id/edit", upload.array("img"), editItem);

regularRouter.delete("/delete", deleteItem);

export default regularRouter;
