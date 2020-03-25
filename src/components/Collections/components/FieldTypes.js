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
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue()}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue()}
        value={props.getValue("name")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue()}
          value={props.getValue("name")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue()}
          value={props.getValue("name")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export class Options extends Component {
  render() {
    return (
      <div className="field">
        <p>Options</p>
        <input type="hidden" value="string" name="dataType" />
        <input
          className="name"
          placeholder="name"
          type="text"
          name="name"
          onChange={this.props.setValue()}
          value={this.props.getValue("name")}
        />
        <input
          className="nameID"
          placeholder="nameID"
          type="text"
          name="nameID"
          onChange={this.props.setValue()}
          value={this.props.getValue("nameID")}
        />
        <div className="extra">
          <label htmlFor="required">Required</label>
          <input
            type="checkbox"
            name="required"
            onChange={this.props.setValue()}
            value={this.props.getValue("required")}
          />
          <label htmlFor="unique">Unique</label>
          <input
            type="checkbox"
            name="unique"
            onChange={this.props.setValue()}
            value={this.props.getValue("unique")}
          />
          <label htmlFor="fieldType">select</label>
          <input
            type="radio"
            value="select"
            name="fieldType"
            onChange={this.props.setValue()}
            value={this.props.getValue("fieldType")}
          />
          <label htmlFor="fieldType">radio</label>
          <input
            type="radio"
            value="radio"
            name="fieldType"
            onChange={this.props.setValue()}
            value={this.props.getValue("fieldType")}
          />
          <div className="groupWrap">
            <button onClick={this.props.addGroup}>Add option</button>
            {this.props.options.map((x, index) => {
              return (
                <div className="group" key={index}>
                  <label htmlFor="optionName">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={this.props.setValue(index)}
                    value={this.props.getValue("name", index)}
                  />
                  <label htmlFor="optionValue">Value</label>
                  <input
                    type="text"
                    name="value"
                    onChange={this.props.setValue(index)}
                    value={this.props.getValue("value", index)}
                  />
                  <button onClick={this.props.removeGroup(index)}>
                    Remove option
                  </button>
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
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue()}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue()}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue()}
          value={props.getValue("required")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue()}
          value={props.getValue("unique")}
        />
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
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue()}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue()}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue()}
          value={props.getValue("required")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue()}
          value={props.getValue("unique")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};
