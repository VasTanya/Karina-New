import { Router } from "express";
import FirstPhotoController from "../Controller/FirstPhotoController.js";
import isAuth from "../Middleware/IsAuth.js";

const firstPhotoRouter = Router();
const { getAll, getById, editItem, deleteItem } = FirstPhotoController;

firstPhotoRouter.get("/", getAll);

firstPhotoRouter.get("/:_id", getById);

firstPhotoRouter.get("/:_id/edit", isAuth, editItem);

firstPhotoRouter.get("/delete", isAuth, deleteItem);

export default firstPhotoRouter;
