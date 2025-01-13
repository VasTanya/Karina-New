import RegularController from "../Controller/RegularController.js";
import upload from "../Middleware/Multer.js";
import { BaseRouter } from "./BaseRouter.js";

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
      upload.single("img"),
      this.controller.editOne,
    );
    this.router.post("/add", upload.single("img"), this.controller.add);
    this.router.delete("/:_id/delete", this.controller.deleteOne);
  }
}

const slicesRouterInstance = new RegularRoute();
export default slicesRouterInstance.getRouter();
