import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    throw new Error("Token generate error: " + error.message);
  }
};

export default generateToken;
