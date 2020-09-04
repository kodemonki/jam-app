const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();
const config = require("config");

const UserService = require("../services/UserService");
const userService = new UserService();

router.get(
  "/",
  jwt({
    secret: config.get("jwt.secret"),
    algorithms: config.get("jwt.algorithms"),
  }),
  async (req, res) => {
    const userid = -1;
    const friends = await userService.getFriendsForUser(userid);
    res.send(friends);
  }
);

module.exports = router;
