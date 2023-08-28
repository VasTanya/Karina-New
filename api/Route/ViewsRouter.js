import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/products", (req, res) => {
  res.render("products");
});

export default viewsRouter;
