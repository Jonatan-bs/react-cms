import React, { Component } from "react";

class DatatypeMenu extends Component {
  state = {};
  render() {
    return (
      <div id="sidemenu" className="fieldTypes">
        <ul>
          <li onClick={this.props.addField("string")}>String</li>
          <li onClick={this.props.addField("text")}>Text</li>
          <li onClick={this.props.addField("number")}>Number</li>
          <li onClick={this.props.addField("options")}>Options</li>
          <li onClick={this.props.addField("image")}>Image</li>
          <li onClick={this.props.addField("boolean")}>Boolean</li>
        </ul>
      </div>
    );
  }
}

export default DatatypeMenu;
