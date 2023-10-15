import jwt from "jsonwebtoken";
import response from "../Utils/Response.js";

const isAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/admin");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("access_token");
      return res.redirect("/admin");
    }
    response(res, 401, { message: "Invalid token" });
  }
};

export default isAuth;
