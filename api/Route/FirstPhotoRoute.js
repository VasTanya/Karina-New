import { Router } from "express";
import FirstPhotoController from "../Controller/FirstPhotoController.js";

const firstPhotoRouter = Router();
const firstPhotoInstance = FirstPhotoController;

firstPhotoRouter.get("/", firstPhotoInstance.getAll);

firstPhotoRouter.get("/:_id", firstPhotoInstance.getById);

export default firstPhotoRouter;
