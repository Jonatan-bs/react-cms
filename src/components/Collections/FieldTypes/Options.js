import React, { Component } from "react";

class Options extends Component {
  state = {
    groups: [""]
  };

  addGroup = () => {
    let groups = [...this.state.groups];
    groups.push("");
    this.setState({ groups });
  };
  render() {
    return (
      <div className="field">
        <p>Options</p>
        <input type="hidden" value="string" name="dataType" />
        <input className="name" placeholder="name" type="text" name="name" />
        <input
          className="nameID"
          placeholder="nameID"
          type="text"
          name="nameID"
        />
        <div className="extra">
          <label htmlFor="required">Required</label>
          <input type="checkbox" name="required" />
          <label htmlFor="unique">Unique</label>
          <input type="checkbox" name="unique" />
          <label htmlFor="fieldType">select</label>
          <input type="radio" value="select" name="fieldType" />
          <label htmlFor="fieldType">radio</label>
          <input type="radio" value="radio" name="fieldType" />
          <div className="groupWrap">
            <button className="addGroup" onClick={this.addGroup}>
              Add option
            </button>
            {this.state.groups.map((x, index) => {
              return (
                <div className="group" key={index}>
                  <label htmlFor="optionName">Name</label>
                  <input type="text" name="optionName" />
                  <label htmlFor="optionValue">Value</label>
                  <input type="text" name="optionValue" />
                </div>
              );
            })}
          </div>
        </div>
        <p onClick={this.props.removeField}>remove</p>
      </div>
    );
  }
}

export default Options;
