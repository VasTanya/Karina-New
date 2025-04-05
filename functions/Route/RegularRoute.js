import { BaseRouter } from "./BaseRouter.js";
import RegularController from "../Controller/RegularController.js";
import upload from "../Middleware/Multer.js";
import isAuth from "../Middleware/IsAuth.js";

class RegularRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = RegularController;
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

const slicesRouterInstance = new RegularRoute();
export default slicesRouterInstance.getRouter();
