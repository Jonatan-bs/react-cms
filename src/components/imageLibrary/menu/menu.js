import React, { Component } from "react";

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
