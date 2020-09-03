import React, { useState, useEffect } from "react";
import axios from "axios";

function Homepage(props) {
  const [protectedData, setProtectedData] = useState("");

  useEffect(() => {
    getProtected();
  }, []);

  const getProtected = (e) => {
    axios
      .get("http://localhost:3001/protected")
      .then((response) => {
        setProtectedData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push('/');
      });
  };

  const newJam = (e) => {
    console.log("new jam");
  };

  return (
    <div className="Homepage">
      <button onClick={newJam}>New Jam</button>
      <p>Projects</p>
      {protectedData !== "" && <p>{protectedData}</p>}
    </div>
  );
}

export default Homepage;
