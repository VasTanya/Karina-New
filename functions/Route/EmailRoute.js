import { BaseRouter } from "./BaseRouter.js";
import EmailController from "../Controller/EmailController.js";
import upload from "../Middleware/Multer.js";

class EmailRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = EmailController;
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/", this.controller.sendRequest);
    this.router.post(
      "/mydesign",
      upload.single("img"),
      this.controller.sendRequestMyDesign,
    );
  }
}

const emailRouterInstance = new EmailRoute();
export default emailRouterInstance.getRouter();
