import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/login", (req, res) => {
  res.render("login", {
    people: [{ name: "bar" }, { name: "bar2" }, { name: "bar3" }],
  });
});

viewsRouter.get("/products", (req, res) => {
  res.render("products");
});

export default viewsRouter;
