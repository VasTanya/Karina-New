import { Router } from "express";
import RegularController from "../Controller/RegularController.js";

const regularRouter = Router();
const { getAll, getById } = RegularController;

regularRouter.get("/", getAll);

regularRouter.get("/:_id", getById);

export default regularRouter;
