import React, { Component } from "react";
import DatatypeMenu from "./../DatatypeMenu";
import * as FieldTypes from "./../../handlers/dataTypeFields";
import * as handler from "./../../handlers/handler";

class Collections extends Component {
  state = {
    collectionData: { name: "", nameID: "", description: "" },
    fields: []
  };

  addField = handler.addField.bind(this);
  addGroup = handler.addGroup.bind(this);
  removeGroup = handler.removeGroup.bind(this);
  removeField = handler.removeField.bind(this);
  setValue = handler.setValue.bind(this);
  setValueMain = handler.setValueMain.bind(this);
  getValue = handler.getValue.bind(this);

  saveCollection = () => {
    const data = { ...this.state.collectionData };

    const fields = [];
    this.state.fields.forEach(field => fields.push(field.values));
    if (fields.length > 0) {
      data.fields = fields;
    }

    fetch("http://localhost:4000/admin/ccData/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <DatatypeMenu addField={this.addField} />

        <button onClick={this.saveCollection}>Save</button>

        <div id="createCollection">
          <div className="autoNameId">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="catName"
              onChange={this.setValueMain("name", true)}
              value={this.state.collectionData.name}
            />

            <label htmlFor="nameID">Name ID</label>
            <input
              type="text"
              id="catNameID"
              onChange={this.setValueMain("nameID")}
              value={this.state.collectionData.nameID}
            />
          </div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="catDescription"
            onChange={this.setValueMain("description")}
            value={this.state.collectionData.description}
          />
        </div>
        <div id="fields">
          {this.state.fields.map((field, index) => {
            return React.createElement(FieldTypes[field.fieldType], {
              removeField: this.removeField(index),
              setValue: this.setValue(index),
              getValue: this.getValue(index),
              addGroup: this.addGroup(index),
              removeGroup: this.removeGroup(index),
              options: this.state.fields[index].values.options,
              key: index
            });
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Collections;
