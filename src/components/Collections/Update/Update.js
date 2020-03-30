import React, { Component } from "react";
// import DatatypeMenu from "./../DatatypeMenu";
import * as dataTypeFields from "../../handlers/dataTypeFields";
import * as handler from "./../../handlers/handler";
import InnerMenu from "./../../innerMenu/innerMenu";

class Update extends Component {
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

  updateCollection = () => {
    const id = this.props.match.params.id;
    const data = { ...this.state.collectionData };
    const fields = [];
    this.state.fields.forEach(field => fields.push(field.values));
    if (fields.length > 0) {
      data.fields = fields;
    }

    fetch("http://localhost:4000/admin/ccData/update/" + id, {
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

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("http://localhost:4000/admin/ccData", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: { _id: id },
        fields: "",
        options: null
      })
    })
      .then(response => response.json())
      .then(collection => {
        collection = collection[0];
        const collectionData = {
          name: collection.name,
          nameID: collection.nameID,
          description: collection.description
        };
        const fields = [];

        collection.fields.forEach(field => {
          if (field.type === "select" || field.type === "radio") {
            fields.push({
              fieldType: "options",
              values: field
            });
          } else {
            fields.push({
              fieldType: field.type,
              values: field
            });
          }
        });

        this.setState({ fields, collectionData, collection });
      });
  }

  render() {
    return (
      <React.Fragment>
        <InnerMenu content="dataTypes" event={this.addField} />

        <section className="innerMenuContent">
          <button onClick={this.updateCollection}>Update</button>

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
              return React.createElement(dataTypeFields[field.fieldType], {
                removeField: this.removeField(index),
                setValue: this.setValue(index),
                getValue: this.getValue(index),
                addGroup: this.addGroup(index),
                removeGroup: this.removeGroup(index),
                options: this.state.fields[index].values.options,
                index: index,
                key: index
              });
            })}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Update;
