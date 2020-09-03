const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

router.get("/", (req, res) => {
  const username = req.query.u;
  const password = req.query.p;

  const payload = { auth: "true" };
  const token = jsonwebtoken.sign(payload, config.get("jwt.secret"));

  res.send(token);
});

module.exports = router;
