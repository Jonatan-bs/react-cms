import React, { Component } from "react";
import * as fieldTypes from "./../../handlers/fieldTypes";

class Update extends Component {
  state = {
    collection: [],
    ccData: [],
    rewriteObj: {},
    fieldTypeObj: {},
    fieldsData: [],
    fields: {}
  };
  setValue = nameID => {
    return event => {
      const fields = { ...this.state.fields };
      fields[nameID] = event.target.value;
      this.setState({ fields });
    };
  };
  updateDocument = () => {
    const id = this.props.match.params.id;
    const collection = this.props.match.params.collection;
    const form = document.getElementById("updateDocument");
    const formData = new FormData(form);
    fetch("http://localhost:4000/admin/cc/" + collection + "/update/" + id, {
      method: "post",
      body: formData
    })
      .then(response => response.json())

      .then(response => console.log(response))
      .catch(err => console.log(err));
  };
  componentDidMount() {
    const collection = this.props.match.params.collection;
    const id = this.props.match.params.id;

    Promise.all([
      fetch("http://localhost:4000/admin/cc/" + collection, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: { _id: id },
          fields: "-__v ",
          options: null
        })
      }),
      fetch("http://localhost:4000/admin/ccData", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: { nameID: collection },
          fields: "",
          options: null
        })
      })
    ])
      .then(responses => {
        return Promise.all(
          responses.map(response => {
            return response.json();
          })
        );
      })
      .then(response => {
        let collection = response[0][0];
        let ccData = response[1][0];

        //create rewrite obj
        const rewriteObj = (() => {
          const obj = {};
          ccData.fields.forEach(field => {
            obj[field.nameID] = field.name;
          });
          return obj;
        })();

        //create fieldType obj
        const fieldTypeObj = (() => {
          const obj = {};
          ccData.fields.forEach(field => {
            obj[field.nameID] = field.type;
          });
          return obj;
        })();
        const fieldsData = ccData.fields;
        const fields = {};

        for (const key in collection) {
          if (key === "_id") continue;
          if (collection.hasOwnProperty(key)) {
            if (fieldTypeObj[key] === "image") {
              const value = collection[key];
              fields[key] = value.originalname;
            } else {
              const value = collection[key];
              fields[key] = value;
            }
          }
        }
        this.setState({
          collection,
          fields,
          ccData,
          rewriteObj,
          fieldTypeObj,
          fieldsData
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.updateDocument}>Update document</button>

        <form id="updateDocument">
          {this.state.fieldsData.map((fieldData, index) => {
            return fieldTypes[fieldData.type](
              fieldData,
              this.state.fields[fieldData.nameID]
                ? this.state.fields[fieldData.nameID]
                : "",
              this.setValue(fieldData.nameID),
              index
            );
          })}
        </form>
      </React.Fragment>
    );
  }
}

export default Update;
