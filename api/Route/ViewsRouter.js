import { Router } from "express";
import isAuth from "../Middleware/IsAuth.js";

const viewsRouter = Router();

viewsRouter.get("/", isAuth, (req, res) => res.render("login"));

viewsRouter.get("/products", isAuth, (req, res) => res.render("products"));

viewsRouter.get("/addProducts", isAuth, (req, res) =>
  res.render("addProducts")
);

export default viewsRouter;
