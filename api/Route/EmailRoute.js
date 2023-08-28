import { Router } from "express";
import EmailController from "../Controller/EmailController.js";

const emailRouter = Router();
const emailInstance = EmailController;

emailRouter.post("/", emailInstance.sendRequest);

export default emailRouter;
