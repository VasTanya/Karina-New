const isAdmin = (req, res, next) => {
  try {
    req.user.permissions.includes("**");

    next();
  } catch (error) {
    return res.status(401).json({
      message:
        error.message ||
        "Permission denied only super admin is allowed to perform this action",
    });
  }
};

export default isAdmin;
