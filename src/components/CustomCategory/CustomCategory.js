import React, { Component } from "react";

class CustomCategory extends Component {
  state = {};
  render() {
    const { collection } = this.props.match.params;

    return <h1> {collection} </h1>;
  }
}

export default CustomCategory;
