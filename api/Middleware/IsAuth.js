import jwt, { decode } from "jsonwebtoken";
import response from "./Response.js";

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        response(res, 401, {
          message: "Invalid token",
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    response(res, 401, {
      message: "No token",
    });
  }
};

export default isAuth;
