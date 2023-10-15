import jwt from "jsonwebtoken";

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
  }
};

export default isAuth;
