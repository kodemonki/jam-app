const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const authService = new AuthService();

router.get("/", async (req, res) => {
  const username = req.query.u;
  const password = req.query.p;

  const data = await authService.getToken(username, password);

  res.send(data);
});

module.exports = router;
