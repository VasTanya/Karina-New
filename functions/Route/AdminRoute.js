import { BaseRouter } from "./BaseRouter.js";
import AdminController from "../Controller/AdminController.js";

class AdminRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = AdminController;
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/login", this.controller.login);
    this.router.get("/seed", this.controller.seed);
    this.router.get("/seed/admin", this.controller.seedAdmin);
    this.router.post("/logout", this.controller.logout);
  }
}

const adminRouteInstance = new AdminRoute();
export default adminRouteInstance.getRouter();
