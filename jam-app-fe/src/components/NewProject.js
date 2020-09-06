import React from "react";
import { Formik } from "formik";
import axios from "axios";

function NewProject(props) {
  const createProject = (values) => {
    axios
      .post("http://localhost:3001/projects/new?u="+props.userData.id, values)
      .then((response) => {
        props.history.push(props.nextRoute);
      })
      .catch((error) => {
        console.log(error);
        props.history.push("/");
      });
  };

  return (
    <div className="NewProject">
      <p>
        New
        <br />
        Project
        <br />
        -------
      </p>
      <Formik
        initialValues={{ name: "NewProject" }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          createProject(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <label>name</label>
            <br />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <br />
            <p style={{ width: "100%", textAlign: "center" }}>-------</p>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default NewProject;
