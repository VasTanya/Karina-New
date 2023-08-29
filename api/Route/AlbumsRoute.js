import { Router } from "express";
import AlbumsController from "../Controller/AlbumsController.js";

const albumsRouter = Router();
const { getAll, getById, getItemById } = AlbumsController;

albumsRouter.get("/", getAll);

albumsRouter.get("/:_id", getById);

albumsRouter.get("/:_id/:item", getItemById);

export default albumsRouter;
