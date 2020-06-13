var express = require("express");
var router = express.Router();

/* GET protected route */
router.get("/protected", (req, res, next) => {
  try {
    res.json({ message: "You reached protected data!", result: true });
  } catch (error) {
    res.json({ error: error.message, result: false });
  }
});

module.exports = router;
