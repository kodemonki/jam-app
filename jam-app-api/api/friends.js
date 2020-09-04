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
    const projects = [{ name: "Friend1" }, { name: "Friend2" }, { name: "Friend3" }];
    res.send(projects);
  }
);

module.exports = router;
