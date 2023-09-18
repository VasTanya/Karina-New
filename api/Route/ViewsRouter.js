import { Router } from "express";
import isAuth from "../Middleware/IsAuth.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  res.render("login");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/products", isAuth, (req, res) => {
  res.render("products");
});

viewsRouter.get("/add_products", isAuth, (req, res) => {
  res.render("add_products");
});

export default viewsRouter;
