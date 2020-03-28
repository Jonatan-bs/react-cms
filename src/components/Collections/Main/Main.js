import React, { Component } from "react";
import { Link } from "react-router-dom";
import InnerMenu from "./../../innerMenu/innerMenu";

class Main extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <InnerMenu content="collections" />
        <Link to="/collections/create">
          <button>Add new collection</button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Main;
