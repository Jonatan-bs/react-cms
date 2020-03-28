import React from "react";
import "./App.css";
import MainNav from "./components/Nav-main";
import Home from "./components/Home";
import CustomCollection from "./components/CustomCollection/CustomCollection";
import Collections from "./components/Collections/Collections";

import Error from "./components/Error";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Heyoo</h1>

      <MainNav className="mainNav" />
      <section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/collections" exact component={Collections.Main} />
          <Route
            path="/collections/create"
            exact
            component={Collections.Create}
          />

          <Route
            path="/collections/update/:id"
            exact
            component={Collections.Update}
          />

          <Route
            path="/cc/:collection"
            exact
            component={CustomCollection.Retrieve}
          />
          <Route
            path="/cc/:collection/create"
            exact
            component={CustomCollection.Create}
          />
          <Route
            path="/cc/:collection/:id"
            exact
            component={CustomCollection.Update}
          />
          <Route component={Error} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
