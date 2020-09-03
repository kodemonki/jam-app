import React from "react";
import axios from "axios";

function Login(props) {

  const getToken = (e) => {
    axios
      .get("http://localhost:3001/login?u=usertest&p=passtest")
      .then((response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data;
        props.history.push(props.nextRoute);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      <p>Login<br/>------</p>
      <button onClick={getToken}>Submit</button>
    </div>
  );
}

export default Login;
