import jwt from "jsonwebtoken";

const generateToken = (admin) => {
  const tokenPayload = {
    _id: admin._id,
    login: admin.login,
  };

  try {
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error("Token generate error: " + error.message);
  }
};

export default generateToken;
