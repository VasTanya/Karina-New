import { BaseRouter } from "./BaseRouter.js";
import SlicesController from "../Controller/SlicesController.js";
import isAuth from "../Middleware/IsAuth.js";
import upload from "../Middleware/Multer.js";

class SlicesRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = SlicesController;
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:_id", this.controller.getById);
    this.router.put(
      "/:_id/edit",
      isAuth,
      upload.single("img"),
      this.controller.editOne
    );
    this.router.post("/add", isAuth, upload.single("img"), this.controller.add);
    this.router.delete("/:_id/delete", isAuth, this.controller.deleteOne);
  }
}

const slicesRouterInstance = new SlicesRoute();

export default slicesRouterInstance.getRouter();
