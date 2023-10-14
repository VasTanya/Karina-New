import { Router } from "express";
import AlbumsController from "../Controller/AlbumsController.js";
import upload from "../Utils/Multer.js";

const albumsRouter = Router();
const {
  getAll,
  getById,
  getItemById,
  firstPhoto,
  search,
  editAlbum,
  editItem,
  deleteAlbum,
  deleteItem,
} = AlbumsController;

albumsRouter.get("/", getAll);

albumsRouter.get("/firstPhoto", firstPhoto);

albumsRouter.get("/search", search);

albumsRouter.get("/:_id", getById);

albumsRouter.get("/:_id/:item", getItemById);

albumsRouter.put("/:_id/edit", editAlbum);

albumsRouter.put("/:albumId/:item/edit", upload.array("img"), editItem);

albumsRouter.delete("/delete", deleteAlbum);

albumsRouter.delete("/:_id/:item/delete", deleteItem);

export default albumsRouter;
