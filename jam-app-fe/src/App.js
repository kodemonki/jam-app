import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <div className="Page">
        <Router>
          <Route
            exact
            path="/"
            render={(renderProps) => (
              <Login {...renderProps} nextRoute="/homepage" />
            )}
          />
          <Route
            exact
            path="/homepage"
            render={(renderProps) => (
              <Homepage {...renderProps} nextRoute="/homepage" />
            )}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
