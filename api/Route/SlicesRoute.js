import { Router } from "express";
import SlicesController from "../Controller/SlicesController.js";
import upload from "../Middleware/Multer.js";

const slicesRouter = Router();
const { getAll, getById, editSlice, add, deleteSlice } = SlicesController;

slicesRouter.get("/", getAll);

slicesRouter.get("/:_id", getById);

slicesRouter.put("/:_id/edit", upload.array("img"), editSlice);

slicesRouter.post("/add", upload.array("img"), add);

slicesRouter.delete("/:_id/delete", deleteSlice);

export default slicesRouter;
