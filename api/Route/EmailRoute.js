import { Router } from "express";
import EmailController from "../Controller/EmailController.js";

const emailRouter = Router();
const { sendRequest, sendRequestYourDesign } = EmailController;

emailRouter.post("/", sendRequest);

emailRouter.post("/yourdesign", sendRequestYourDesign);

export default emailRouter;
