const express = require("express");
const router = express.Router();
const db = require("../helpers/fakedb");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, createRefreshToken } = require("../helpers/tokens");
const { verify } = require("jsonwebtoken");

/* POST register user */
router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = db.find((user) => user.email === email);

    if (user) throw new Error("User already exist");

    const hashedPass = await hash(password, 10);

    db.push({
      email,
      id: db.length,
      password: hashedPass,
    });
    console.log(db);
    res.json({ message: "User Created", result: true });
  } catch (error) {
    res.json({ error: error.message, result: false });
  }
});

/* POST login user */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = db.find((user) => user.email === email);

    if (!user) throw new Error("User does not exist");

    const validPass = await compare(password, user.password);

    if (!validPass) throw new Error("Password is not correct");

    const accessToken = createAccessToken({ id: user.id });
    const refreshToken = createRefreshToken({ id: user.id });

    user.refreshToken = refreshToken;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });
    console.log(db);
    res.json({
      accessToken,
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.json({ error: error.message, result: false });
  }
});

/* POST logout user */
router.post("/logout", async (req, res, next) => {
  res.clearCookie("refreshToken", { path: "/refreshToken" });
  res.json({ message: "Logged out", result: true });
});

/* POST new access token with refresh token */
router.post("/refreshToken", async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.json({ accessToken: "", result: false });
  let payload = null;
  try {
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.json({ accessToken: "", result: false });
  }
  const user = db.find((user) => user.id === payload.id);

  if (!user) return res.json({ accessToken: "", result: false });

  if (user.refreshToken !== refreshToken)
    return res.json({ accessToken: "", result: false });

  const newAccessToken = createAccessToken({ id: user.id });
  const newRefreshToken = createRefreshToken({ id: user.id });

  user.refreshToken = newRefreshToken;

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    path: "/refreshToken",
  });

  res.json({ accessToken: newAccessToken, result: true });
});

module.exports = router;
