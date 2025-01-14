import isAuth from "../Middleware/IsAuth.js";
import { BaseRouter } from "./BaseRouter.js";

class ViewsRouter extends BaseRouter {
  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", (req, res) => res.render("login"));
    this.router.get("/products", (req, res) => res.render("products"));
    this.router.get("/addProducts", (req, res) => res.render("addProducts"));
  }
}

const viewsRouterInstance = new ViewsRouter();
export default viewsRouterInstance.getRouter();
