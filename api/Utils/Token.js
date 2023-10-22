import jwt from "jsonwebtoken";

const generateToken = (admin) => {
  const tokenPayload = {
    _id: admin._id,
    login: admin.login,
  };
  console.log("PAYLOAD: ", tokenPayload);
  try {
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "1h",
    });
    console.log("TOKEN: ", token);
    return token;
  } catch (error) {
    throw new Error("Token generate error: " + error.message);
  }
};

export default generateToken;
