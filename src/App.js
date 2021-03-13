import React from "react";
import { Router } from "react-router-dom";
import { Routing } from "./Routing";
import { history } from "./services/history";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Routing />
      </Router>
    </div>
  );
}

export default App;
