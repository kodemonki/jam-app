const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();
const config = require("config");

const ProjectsService = require("../services/ProjectsService");
const projectsService = new ProjectsService();

router.get(
  "/",
  jwt({
    secret: config.get("jwt.secret"),
    algorithms: config.get("jwt.algorithms"),
  }),
  async (req, res) => {
    const userid = req.query.u;
    const projects = await projectsService.getProjectsForUser(userid);
    res.send(projects);
  }
);

module.exports = router;
