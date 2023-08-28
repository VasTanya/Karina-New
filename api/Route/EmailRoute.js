import { Router } from "express";
import EmailController from "../Controller/EmailController.js";

const emailRouter = Router();
const { sendRequest } = EmailController;

emailRouter.post("/", sendRequest);

export default emailRouter;
