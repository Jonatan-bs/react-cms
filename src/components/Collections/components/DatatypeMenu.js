import React, { Component } from "react";

class DatatypeMenu extends Component {
  state = {};
  render() {
    return (
      <div id="sidemenu" className="fieldTypes">
        <ul>
          <li onClick={this.props.addField("String")}>String</li>
          <li onClick={this.props.addField("Text")}>Text</li>
          <li onClick={this.props.addField("Number")}>Number</li>
          <li onClick={this.props.addField("Options")}>Options</li>
          <li onClick={this.props.addField("Image")}>Image</li>
          <li onClick={this.props.addField("Boolean")}>Boolean</li>
        </ul>
      </div>
    );
  }
}

export default DatatypeMenu;
