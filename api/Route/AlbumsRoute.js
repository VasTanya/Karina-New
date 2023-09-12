import { Router } from "express";
import AlbumsController from "../Controller/AlbumsController.js";

const albumsRouter = Router();
const {
  getAll,
  getById,
  getItemById,
  firstPhoto,
  search,
  editItem,
  deleteItem,
} = AlbumsController;

albumsRouter.get("/", getAll);

albumsRouter.get("/firstPhoto", firstPhoto);

albumsRouter.get("/search", search);

albumsRouter.get("/:_id", getById);

albumsRouter.get("/:_id/:item", getItemById);

albumsRouter.get("/:_id/edit", editItem);

albumsRouter.get("/delete", deleteItem);

export default albumsRouter;
