import React, { Component } from "./node_modules/react";

class Menu extends Component {
  state = { info: {} };
  componentDidMount() {}

  render() {
    return this.state.images.map((image, index) => {
      return <p>Menu</p>;
    });
  }
}

export default Menu;
