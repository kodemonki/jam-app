import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jwt, setJwt] = useState("");
  const [protectedData, setProtectedData] = useState("");

  const getToken = (e) => {
    axios
      .get("http://localhost:3001/auth?u=usertest&p=passtest")
      .then((response) => {
        setJwt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProtected = (e) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    axios
      .get("http://localhost:3001/protected")
      .then((response) => {
        setProtectedData(response.data);
      })
      .catch((error) => {
        setProtectedData(error.message);
      });
  };

  return (
    <div className="App">
      <button onClick={getToken}>getToken</button>
      <p>{jwt}</p>
      <button onClick={getProtected}>getProtected</button>
      {protectedData !== "" && <p>{protectedData}</p>}
    </div>
  );
}

export default App;
