import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.render("login");
  } else {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;

      if (req.path === "/" && decodedToken) {
        return res.redirect("/products");
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.clearCookie("access_token");
        return res.redirect("/");
      } else {
        res.clearCookie("access_token");
        return res.redirect("/");
      }
    }
  }
};

export default isAuth;
