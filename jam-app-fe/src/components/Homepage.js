import React, { useState, useEffect } from "react";
import axios from "axios";

function Homepage(props) {
  const [protectedData, setProtectedData] = useState(null);

  useEffect(() => {
    getProtected();
  }, []);

  const getProtected = (e) => {
    axios
      .get("http://localhost:3001/projects")
      .then((response) => {
        setProtectedData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push('/');
      });
  };

  const newProject = (e) => {
    console.log("new Project");
  };

  return (
    <div className="Homepage">
      <p>Projects<br/>--------</p>
      {protectedData !==  null && protectedData.map((project, index) => (
        <p key={'project+index'}>{project.name}</p>
      ))}
      <button onClick={newProject}>New Project</button>
    </div>
  );
}

export default Homepage;
