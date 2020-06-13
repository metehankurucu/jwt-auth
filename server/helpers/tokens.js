const { sign } = require("jsonwebtoken");

const createAccessToken = (params) => {
  return sign({ ...params }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (params) => {
  return sign({ ...params }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
