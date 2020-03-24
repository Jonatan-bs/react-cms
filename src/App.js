import React from "react";
import "./App.css";
import MainNav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import CustomCategory from "./components/CustomCategory/CustomCategory";
import Error from "./components/Error/Error";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Heyoo</h1>

      <MainNav />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cc/:collection" exact component={CustomCategory} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
