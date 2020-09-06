const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
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

router.get(
  "/detail",
  jwt({
    secret: config.get("jwt.secret"),
    algorithms: config.get("jwt.algorithms"),
  }),
  async (req, res) => {
    const projectid = req.query.p;
    const project = await projectsService.getDetailForProject(projectid);
    res.send(project)
  }
);

router.post(
  "/new",
  jwt({
    secret: config.get("jwt.secret"),
    algorithms: config.get("jwt.algorithms"),
  }),
  async (req, res) => {
    const userid = req.query.u;
    const dto = req.body;
    await projectsService.newProjectForUser(userid,dto);
    res.send(true)
  }
);

module.exports = router;
