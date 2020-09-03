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
    const projects = [{ name: "Project1" }, { name: "Project2" }, { name: "Project3" }];
    res.send(projects);
  }
);

module.exports = router;
