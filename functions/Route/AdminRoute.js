import { BaseRouter } from "./BaseRouter.js";
import AdminController from "../Controller/AdminController.js";
import isAuth from "../Middleware/IsAuth.js";
import isAdmin from "../Middleware/IsAdmin.js";

class AdminRoute extends BaseRouter {
  constructor() {
    super();
    this.controller = AdminController;
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/login", this.controller.login);
    this.router.get("/profile", isAuth, this.controller.profile);
    this.router.get("/seed", isAuth, isAdmin, this.controller.seed);
    this.router.get("/seed/admin", isAuth, isAdmin, this.controller.seedAdmin);
    this.router.post("/logout", isAuth, this.controller.logout);
  }
}

const adminRouteInstance = new AdminRoute();
export default adminRouteInstance.getRouter();
