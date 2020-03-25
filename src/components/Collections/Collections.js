import React, { Component } from "react";
import DatatypeMenu from "./components/DatatypeMenu";
import * as FieldTypes from "./components/FieldTypes";

class Collections extends Component {
  state = {
    collectionData: { name: "", nameID: "", description: "" },
    fields: []
  };

  addField(fieldType) {
    return () => {
      const fields = [...this.state.fields];
      if (fieldType === "Options") {
        fields.push({
          fieldType: fieldType,
          values: {
            name: "",
            nameID: "",
            required: false,
            unique: false,
            type: fieldType,
            options: []
          }
        });
      } else {
        fields.push({
          fieldType: fieldType,
          values: {
            name: "",
            nameID: "",
            required: false,
            unique: false,
            type: fieldType
          }
        });
      }
      this.setState({ fields });
    };
  }

  addGroup(index) {
    return () => {
      const fields = [...this.state.fields];
      fields[index].values.options.push({ name: "", value: "" });
      this.setState({ fields });
    };
  }
  removeGroup(index) {
    return groupIndex => {
      return () => {
        const fields = [...this.state.fields];
        fields[index].values.options.splice(groupIndex, 1);
        this.setState({ fields });
      };
    };
  }

  removeField(index) {
    return () => {
      const fields = [...this.state.fields];
      fields.splice(index, 1);
      this.setState({ fields });
    };
  }
  setValue(index) {
    return groupIndex => {
      return event => {
        const fields = [...this.state.fields];
        if (groupIndex || groupIndex === 0) {
          if (!fields[index].values.options[groupIndex])
            fields[index].values.options[groupIndex] = {};

          fields[index].values.options[groupIndex][event.target.name] =
            event.target.value;
          this.setState({ fields });
        } else {
          fields[index].values[event.target.name] = event.target.value;
          this.setState({ fields });
        }
      };
    };
  }
  setValueMain(name) {
    return event => {
      const collectionData = { ...this.state.collectionData };
      collectionData[name] = event.target.value;
      this.setState({ collectionData });
    };
  }
  getValue(index, mainFields) {
    const fields = this.state.fields;
    return (name, groupIndex) => {
      if (groupIndex || groupIndex === 0) {
        if (fields[index].values.options[groupIndex]) {
          return fields[index].values.options[groupIndex][name];
        } else {
          return "";
        }
      } else {
        if (fields[index].values[name]) {
          return fields[index].values[name];
        } else {
          return "";
        }
      }
    };
  }
  saveCollection = () => {
    const data = { ...this.state.collectionData };

    const fields = [];
    this.state.fields.forEach(field => fields.push(field.values));
    if (fields.length > 0) {
      data.fields = fields;
    }
    console.log(data);

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

  componentDidMount() {
    fetch("http://localhost:4000/admin/ccData", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: "",
        fields: "name nameID",
        options: null
      })
    })
      .then(response => response.json())
      .then(collections => {
        this.setState({ collections });
      });
  }

  render() {
    return (
      <React.Fragment>
        <DatatypeMenu addField={this.addField.bind(this)} />

        <button
          id="saveCollection"
          className="save"
          onClick={this.saveCollection}
        >
          Save
        </button>

        <div id="createCollection">
          <div className="autoNameId">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="catName"
              onChange={this.setValueMain("name")}
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
          {this.state.fields.map((datatype, index) => {
            return React.createElement(FieldTypes[datatype.fieldType], {
              removeField: this.removeField(index).bind(this),
              setValue: this.setValue(index).bind(this),
              getValue: this.getValue(index).bind(this),
              addGroup: this.addGroup(index).bind(this),
              removeGroup: this.removeGroup(index).bind(this),
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
