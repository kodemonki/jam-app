const express = require("express");
const config = require("config");
const app = express();

const login = require("./api/login");
const projects = require("./api/projects");
const friends = require("./api/friends");
const protected = require("./api/protected");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/login", login);
app.use("/projects", projects);
app.use("/friends", friends);
app.use("/protected", protected);

app.listen(config.get("app.port"), () =>
  console.log("Server started")
);
