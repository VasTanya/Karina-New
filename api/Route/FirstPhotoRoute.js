import { Router } from "express";
import FirstPhotoController from "../Controller/FirstPhotoController.js";

const firstPhotoRouter = Router();
const { getAll, getById } = FirstPhotoController;

firstPhotoRouter.get("/", getAll);

firstPhotoRouter.get("/:_id", getById);

export default firstPhotoRouter;
