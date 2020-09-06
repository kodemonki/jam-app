import React from "react";
import { Formik } from "formik";
import axios from "axios";

function Login(props) {
  const getToken = (values) => {
    axios
      .get(
        "http://localhost:3001/login?u=" +
          values.username +
          "&p=" +
          values.password
      )
      .then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        props.setUserData(response.data);
        props.history.push(props.nextRoute);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      <p>
        Login
        <br />
        ------
      </p>
      <Formik
        initialValues={{ username: "Tom", password: "password!" }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          getToken(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <label>username</label>
            <br />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              name="username"
            />
            {props.errors.username && (
              <div id="feedback">{props.errors.username}</div>
            )}
            <br />
            <label>password</label>
            <br />
            <input
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
            />
            {props.errors.password && (
              <div id="feedback">{props.errors.password}</div>
            )}
            <br />
            <p style={{ width: "100%", textAlign: "center" }}>------</p>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
