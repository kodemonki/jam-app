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
      });
  };

  return (
    <div className="Homepage">
      <p>Homepage</p>
      {protectedData !== "" && <p>{protectedData}</p>}
    </div>
  );
}

export default Homepage;
