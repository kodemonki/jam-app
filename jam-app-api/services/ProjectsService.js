class ProjectsService {
  getProjectsForUser(userid) {
    const projects = [
      { name: "Project1" },
      { name: "Project2" },
      { name: "Project3" },
    ];

    return projects;
  }
}

module.exports = ProjectsService;
