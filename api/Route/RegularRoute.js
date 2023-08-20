import { Router } from "express";
import RegularController from "../Controller/RegularController.js";

const regularRouter = Router();
const regularInstance = RegularController;

regularRouter.get("/", regularInstance.getAll);

regularRouter.get("/:_id", regularInstance.getById);

export default regularRouter;
