import { Router } from "express";
import EmailController from "../Controller/EmailController.js";
import upload from "../Middleware/Multer.js";

const emailRouter = Router();
const { sendRequest, sendRequestMyDesign } = EmailController;

emailRouter.post("/", sendRequest);

// Use the middleware before calling the route handler
emailRouter.post("/mydesign", upload.array("img"), (req, res) => {
  console.log("====================================");
  console.log("ROUTE: ", req.files); // Use req.files for arrays
  console.log("====================================");
  sendRequestMyDesign(req, res); // Call the route handler
});

export default emailRouter;
