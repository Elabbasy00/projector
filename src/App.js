// import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";

import Controller from "./layouts/controller/controller";
import Viwer from "./layouts/viwer/viwer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact component={Controller} path="/" />
        <Route exact component={Viwer} path="/projector/" />
      </Switch>
    </div>
  );
}

export default App;
