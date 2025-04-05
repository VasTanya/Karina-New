import { BaseRouter } from "./BaseRouter.js";
import AlbumsController from "../Controller/AlbumsController.js";
import isAuth from "../Middleware/IsAuth.js";
import upload from "../Middleware/Multer.js";

class AlbumsRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = AlbumsController;
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/firstPhoto", this.controller.firstPhoto);
    this.router.get("/search", this.controller.search);
    this.router.get("/:_id", this.controller.getById);
    this.router.get("/:_id/:item", this.controller.getItemById);
    this.router.put("/:_id/edit", isAuth, this.controller.editAlbum);
    this.router.put(
      "/:albumId/:item/edit",
      isAuth,
      upload.single("img"),
      this.controller.editItem
    );
    this.router.post("/add", isAuth, this.controller.addAlbum);
    this.router.post(
      "/:albumId/add",
      isAuth,
      upload.single("img"),
      this.controller.addItem
    );
    this.router.delete("/:_id/delete", isAuth, this.controller.deleteAlbum);
    this.router.delete(
      "/:_id/:item/delete",
      isAuth,
      this.controller.deleteItem
    );
  }
}

const albumsRouterInstance = new AlbumsRoute();
export default albumsRouterInstance.getRouter();
