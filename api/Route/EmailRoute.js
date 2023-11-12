import { Router } from "express";
import EmailController from "../Controller/EmailController.js";

const emailRouter = Router();
const { sendRequest, sendRequestMyDesign } = EmailController;

emailRouter.post("/", sendRequest);

emailRouter.post("/mydesign", sendRequestMyDesign);

export default emailRouter;
