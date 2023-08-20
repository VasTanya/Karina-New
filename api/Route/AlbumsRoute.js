import { Router } from "express";
import AlbumsController from "../Controller/AlbumsController.js";

const albumsRouter = Router();
const albumsInstance = AlbumsController;

albumsRouter.get("/", albumsInstance.getAll);

albumsRouter.get("/:_id", albumsInstance.getById);

export default albumsRouter;
