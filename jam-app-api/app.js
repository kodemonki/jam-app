const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");

const app = express();
const secret = "secret";

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/auth", (req, res) => {
  console.log(req.body)
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

