import jwt from "jsonwebtoken";

const generateToken = (admin) => {
  return jwt.sign(
    {
      _id: admin._id,
      login: admin.login,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export default generateToken;
