import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Homepage from "./components/Homepage";
import NewProject from "./components/NewProject";
import OpenProject from "./components/OpenProject";

function App() {
  const [userData, setUserData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  return (
    <div className="App">
      <div className="Page">
        <Router>
          <Switch>
            {userData !== null && (
              <Route
                exact
                path="/homepage"
                render={(renderProps) => (
                  <Homepage
                    {...renderProps}
                    userData={userData}
                    setProjectData={setProjectData}
                  />
                )}
              />
            )}
            <Route
            exact
              path="/newproject"
              render={(renderProps) => (
                <NewProject
                  {...renderProps}
                  userData={userData}
                  nextRoute="/homepage"
                />
              )}
            />
            <Route
            exact
              path="/openproject"
              render={(renderProps) => (
                <OpenProject
                  {...renderProps}
                  userData={userData}
                  projectData={projectData}
                  nextRoute="/homepage"
                />
              )}
            />
            <Route
              path="/"
              render={(renderProps) => (
                <Login
                  {...renderProps}
                  setUserData={setUserData}
                  nextRoute="/homepage"
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
