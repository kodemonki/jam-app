import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";

function OpenProject(props) {
  const [projectData, setProjectData] = useState(null);

  const getProtected = () => {
    axios
      .get("http://localhost:3001/projects/detail?p=" + props.projectData._id)
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.log(error);
        props.history.push("/");
      });
  };

  useEffect(() => {
    if (props.projectData !== null) {
      getProtected();
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="NewProject">
      <p>
        Project
        <br />
        -------
      </p>
      {props.projectData && (
        <>
          {props.projectData !== null && <h3>{props.projectData.name}</h3>}
          {projectData !== null && (
            <>
              <div>{projectData.ownerid}</div>
              <div>{projectData.collaborators}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OpenProject;
