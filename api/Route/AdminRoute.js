import { Router } from "express";
import AdminController from "../Controller/AdminController.js";

const adminRouter = Router();
const { login, logout } = AdminController;

adminRouter.post("/login", login);

adminRouter.post("/logout", logout);

export default adminRouter;
