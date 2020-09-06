import React, { useState, useEffect } from "react";
import axios from "axios";

function Homepage(props) {
  const [protectedData, setProtectedData] = useState(null);

  const getProtected = (e) => {
    axios
      .get("http://localhost:3001/projects?u=" + props.userData.id)
      .then((response) => {
        setProtectedData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push("/");
      });
  };

  useEffect(() => {
    getProtected();
    // eslint-disable-next-line
  }, []);

  const newProject = (e) => {
    props.history.push("/newproject");
  };

  const openProject = (project) => {
    props.setProjectData(project);
    props.history.push("/openproject");
  };
  return (
    <div className="Homepage">
      <p>
        Projects
        <br />
        ---------
      </p>
      {protectedData !== null &&
        protectedData.map((project, index) => (
          <p key={"project" + index}>
            <button
              onClick={() => {
                openProject(project);
              }}
            >
              Open {project.name}
            </button>
          </p>
        ))}
      <p>---------</p>
      <button onClick={newProject}>New Project</button>
    </div>
  );
}

export default Homepage;
