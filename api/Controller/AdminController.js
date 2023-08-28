import expressAsyncHandler from "express-async-handler";
import AdminService from "../Service/AdminService.js";

class AdminController {
  constructor() {
    this.AdminService = new AdminService();
    this.login = expressAsyncHandler(this.login.bind(this));
  }

  login = async (req, res) => {
    const { login, password } = req.body;

    console.log("LOGIN: ", login);
    console.log("PASSWORD", password);
  };
}

export default new AdminController();
