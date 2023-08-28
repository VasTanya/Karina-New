import { Router } from "express";
import AdminController from "../Controller/AdminController.js";

const adminRouter = Router();
const { login } = AdminController;

adminRouter.post("/login", login);

export default adminRouter;
