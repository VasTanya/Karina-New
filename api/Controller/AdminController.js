import expressAsyncHandler from "express-async-handler";
import AdminService from "../Service/AdminService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class AdminController {
  constructor() {
    this.AdminService = new AdminService();
    this.login = expressAsyncHandler(this.login.bind(this));
    this.logout = expressAsyncHandler(this.logout.bind(this));
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await this.AdminService.login(email, password);

      res.cookie("access_token", admin, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      response(res, 200, { message: "Login successful" });
    } catch (error) {
      logger.error(`Error during login: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };

  logout = async (req, res) => {
    try {
      await res.clearCookie("access_token");

      await res.redirect("/login");

      response(res, 200, { message: "Logout successful" });
    } catch (error) {
      logger.error(`Error during logout: ${error}`);
      return response(res, error.statusCode || 500, {
        _message: error.message,
      });
    }
  };
}

export default new AdminController();
