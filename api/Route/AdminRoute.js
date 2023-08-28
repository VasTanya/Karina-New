import { Router } from "express";
import AdminController from "../Controller/AdminController.js";

const adminRouter = Router();
const adminInstance = AdminController;

adminRouter.post("/login", adminInstance.login);

export default adminRouter;
