import bcrypt from "bcryptjs";
import Admin from "../Model/AdminModel.js";
import generateToken from "../Utils/Token.js";
import logger from "../Utils/Logger/Logger.js";

class AdminService {
  constructor() {}

  login = async (email, password) => {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin);
        return token;
      }
    }
    const message = "Wrong email or password";
    return message;
  };
}

export default AdminService;
