const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");

const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const secret = "secret";

app.get("/auth", (req, res) => {
  const username = req.query.u;
  const password = req.query.p;

  const payload = { auth: "true" };
  const token = jsonwebtoken.sign(payload, secret);

  res.send(token);
});

app.get(
  "/protected",
  jwt({ secret: secret, algorithms: ["HS256"] }),
  (req, res) => {
    res.send("Protected Data");
  }
);

app.listen(3001, () => console.log("JamAppApi : server started"));
