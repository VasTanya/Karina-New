import { Router } from "express";
import EmailController from "../Controller/EmailController.js";
import upload from "../Middleware/Multer.js";

const emailRouter = Router();
const { sendRequest, sendRequestMyDesign } = EmailController;

emailRouter.post("/", sendRequest);
emailRouter.post("/mydesign", upload.none(), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  sendRequestMyDesign(req, res);
});

export default emailRouter;
