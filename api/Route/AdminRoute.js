import { Router } from "express";
import AdminController from "../Controller/AdminController.js";

const adminRouter = Router();
const { login, seed, seedAdmin, logout } = AdminController;

adminRouter.post("/login", login);

adminRouter.get("/seed", seed);

adminRouter.get("/seed/admin", seedAdmin);

adminRouter.post("/logout", logout);

export default adminRouter;
