const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();
const config = require("config");

router.get(
  "/",
  jwt({
    secret: config.get("jwt.secret"),
    algorithms: config.get("jwt.algorithms"),
  }),
  (req, res) => {
    res.send("Protected Data :)");
  }
);

module.exports = router;
