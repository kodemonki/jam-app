const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
const app = express();
const secret = "secret";

app.post("/auth", (req, res) => {
  const token = jsonwebtoken.sign({ foo: "bar" }, secret);
  res.send(token);
});

app.get(
  "/protected",
  jwt({ secret: secret, algorithms: ["HS256"] }),
  (req, res) => {
    res.send("protected");
  }
);

app.listen(3000, () => console.log("server started"));

