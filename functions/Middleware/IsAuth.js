import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

export default isAuth;
