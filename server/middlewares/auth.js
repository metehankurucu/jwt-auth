const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].replace("Bearer ", "");
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          throw new Error("Authentication failed");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      throw new Error("No token provided.");
    }
  } catch (error) {
    res.json({ error: error.message, result: false });
  }
};

module.exports = {
  verifyToken,
};
