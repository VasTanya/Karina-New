import expressAsyncHandler from "express-async-handler";
import AdminService from "../Service/AdminService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class AdminController {
  constructor() {
    this.AdminService = new AdminService();
    this.login = expressAsyncHandler(this.login.bind(this));
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await this.AdminService.login(email, password);
      response(res, 200, { token: admin });
    } catch (error) {
      logger.error(`Error during login: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new AdminController();
