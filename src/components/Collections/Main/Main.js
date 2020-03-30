import React, { Component } from "react";
import { Link } from "react-router-dom";
import InnerMenu from "./../../innerMenu/innerMenu";

class Main extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section className="innerMenuContent">
          <InnerMenu content="collections" />
          <Link to="/collections/create">
            <button>Add new collection</button>
          </Link>
        </section>
      </React.Fragment>
    );
  }
}

export default Main;
