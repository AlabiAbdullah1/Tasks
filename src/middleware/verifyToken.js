const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401).json({
      status: false,
      message: "You are not authorized to access this route",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decoded.email };
    // console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: false,
      message: error.message,
      message:
        "Authentication failed. You are not authorized to access this route",
    });
  }
};
