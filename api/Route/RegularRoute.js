import { Router } from "express";
import RegularController from "../Controller/RegularController.js";
import upload from "../Middleware/Multer.js";

const regularRouter = Router();
const { getAll, getById, editRegular, add, deleteRegular } = RegularController;

regularRouter.get("/", getAll);

regularRouter.get("/:_id", getById);

regularRouter.put("/:_id/edit", upload.array("img"), editRegular);

regularRouter.post("/add", upload.array("img"), add);

regularRouter.delete("/:_id/delete", deleteRegular);

export default regularRouter;
