import React, { Component } from "react";
import DatatypeMenu from "./DatatypeMenu";
// import Boolean from "./FieldTypes/Boolean";
// import Image from "./FieldTypes/Image";
// import Number from "./FieldTypes/Number";
// import Options from "./FieldTypes/Options";
// import String from "./FieldTypes/String";
// import Text from "./FieldTypes/Text";
import * as FieldTypes from "./FieldTypes/FieldTypes";

class Collections extends Component {
  state = {
    fields: []
  };

  addField(newField) {
    return () => {
      const fields = [...this.state.fields];
      fields.push(newField);
      this.setState({ fields });
    };
  }

  removeField(index) {
    return () => {
      const fields = [...this.state.fields];
      fields.splice(index, 1);
      this.setState({ fields });
    };
  }

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

        <button id="saveCollection" className="save">
          Save
        </button>

        <div id="createCollection">
          <div className="autoNameId">
            <label htmlFor="name">Name</label>
            <input type="text" id="catName" />

            <label htmlFor="nameID">Name ID</label>
            <input type="text" id="catNameID" />
          </div>
          <label htmlFor="description">Description</label>
          <input type="text" id="catDescription" />
        </div>
        <div id="fields">
          {this.state.fields.map((datatype, index) => {
            return React.createElement(FieldTypes[datatype], {
              removeField: this.removeField(index).bind(this),
              key: index
            });

            // if (datatype === "boolean") {
            //   return (
            //     <Boolean
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else if (datatype === "number") {
            //   return (
            //     <Number
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else if (datatype === "image") {
            //   return (
            //     <Image
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else if (datatype === "options") {
            //   return (
            //     <Options
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else if (datatype === "string") {
            //   return (
            //     <String
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else if (datatype === "text") {
            //   return (
            //     <Text
            //       removeField={this.removeField(index).bind(this)}
            //       key={index}
            //     />
            //   );
            // } else {
            //   return "";
            // }
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Collections;
