import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Homepage from "./components/Homepage";

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <div className="Page">
        <Router>
          <Route
            exact
            path="/"
            render={(renderProps) => (
              <Login {...renderProps} setUserData={setUserData} nextRoute="/homepage" />
            )}
          />
          <Route
            exact
            path="/homepage"
            render={(renderProps) => (
              <Homepage {...renderProps} userData={userData} nextRoute="/homepage" />
            )}
          />
        </Router>
        {userData !== null && console.log(userData)}
      </div>
    </div>
  );
}

export default App;
