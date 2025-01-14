import expressAsyncHandler from "express-async-handler";
import AdminService from "../Service/AdminService.js";
import response from "../Utils/Response.js";
import logger from "../Utils/Logger/Logger.js";

class AdminController {
  constructor() {
    this.AdminService = new AdminService();
    this.login = expressAsyncHandler(this.login.bind(this));
    this.seed = expressAsyncHandler(this.seed.bind(this));
    this.seedAdmin = expressAsyncHandler(this.seedAdmin.bind(this));
    this.logout = expressAsyncHandler(this.logout.bind(this));
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await this.AdminService.login(email, password);

      res.cookie("access_token", admin.token, {
        httpOnly: true,
        sameSite: "strict",
        // secure: true,
      });

      response(res, 200, admin.message);
    } catch (error) {
      logger.error(`[ADMIN-CTRL]: Error during login: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };

  seed = async (req, res) => {
    try {
      const seed = await this.AdminService.seed();

      response(res, 201, seed);
    } catch (error) {
      logger.error("[ADMIN-CTRL]: Error during seed:", error);
      response(res, error.statusCode || 500, {
        message: `Error during seeding: ${error.message}`,
      });
    }
  };

  seedAdmin = async (req, res) => {
    try {
      const createdAdmin = this.AdminService.seedAdmin();

      response(res, 201, createdAdmin);
    } catch (error) {
      logger.error("[ADMIN-CTRL]: Error during seedAdmin:", error);
      response(res, error.statusCode || 500, {
        message: `Error during seeding: ${error.message}`,
      });
    }
  };

  logout = async (req, res) => {
    try {
      const logout = this.AdminService.logout(req, res);

      response(res, 200, logout);
    } catch (error) {
      logger.error(`[ADMIN-CTRL]: Error during logout: ${error}`);
      return response(res, error.statusCode || 500, {
        message: error.message,
      });
    }
  };
}

export default new AdminController();
