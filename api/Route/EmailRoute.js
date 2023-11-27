import { Router } from "express";
import EmailController from "../Controller/EmailController.js";
import upload from "../Middleware/Multer.js";

const emailRouter = Router();
const { sendRequest, sendRequestMyDesign } = EmailController;

emailRouter.post("/", sendRequest);

emailRouter.post("/mydesign", (req, res) => {
  console.log("====================================");
  console.log("ROUTE: ", req.file);
  console.log("====================================");
  upload.array("img"), sendRequestMyDesign;
});

export default emailRouter;
