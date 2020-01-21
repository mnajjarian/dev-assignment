import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Package from "./Package";
import Detail from "./Detail";

const baseUrl = "/api";

const App = () => {
  const [state, setstate] = useState([]);

  const getPackages = () =>
    axios.get(baseUrl).then(result => setstate(result.data));
  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Package packages={state} />} />
        <Route
          exact
          path="/:id"
          render={({ match }) => <Detail id={match.url} packages={state} />}
        />
      </Switch>
    </div>
  );
};

export default App;
