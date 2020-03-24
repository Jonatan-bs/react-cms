import React, { Component } from "react";

export const Boolean = props => {
  return (
    <div className="field">
      <p>Boolean</p>
      <input type="hidden" value="boolean" name="dataType" />
      <input type="hidden" value="checkbox" name="fieldType" />
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
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const Image = props => {
  return (
    <div className="field">
      <p>Image</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="image" name="fieldType" />
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
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const Number = props => {
  return (
    <div className="field">
      <p>Number</p>
      <input type="hidden" value="number" name="dataType" />
      <input type="hidden" value="number" name="fieldType" />
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
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export class Options extends Component {
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

export const String = props => {
  return (
    <div className="field">
      <p>String</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="string" name="fieldType" />
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
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const Text = props => {
  return (
    <div className="field">
      <p>Text</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="text" name="fieldType" />
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
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};
