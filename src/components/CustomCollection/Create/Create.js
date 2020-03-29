import React, { Component } from "react";
import * as handler from "./../../handlers/handler";
import * as fieldTypes from "./../../handlers/fieldTypes";
import ImageLibraryPicker from "./../../ImageLibraryPicker/ImageLibraryPicker";
class Create extends Component {
  state = {
    collectionData: { name: "", nameID: "", description: "" },
    fields: [],
    fieldsData: [],
    imagePicker: false
  };

  addField = handler.addField.bind(this);
  addGroup = handler.addGroup.bind(this);
  removeGroup = handler.removeGroup.bind(this);
  removeField = handler.removeField.bind(this);
  setValue = nameID => {
    return event => {
      const fields = { ...this.state.fields };
      fields[nameID] = event.target.value;
      this.setState({ fields });
    };
  };

  createDocument = e => {
    const collection = this.props.match.params.collection;
    const fields = this.state.fields;

    fetch("http://localhost:4000/admin/cc/" + collection + "/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    })
      .then(response => response.json())

      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const collection = this.props.match.params.collection;
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
      .then(response => response.json())
      .then(collection => {
        collection = collection[0];
        const fieldsData = collection.fields;
        let fields = {};

        fieldsData.forEach(field => {
          if (field.type === "image") {
            fields[field.nameID] = [];
          } else {
            fields[field.nameID] = "";
          }
        });

        const collectionData = {
          name: collection.name,
          nameID: collection.nameID,
          description: collection.description
        };
        this.setState({ fieldsData, collectionData, fields });
      });
  }
  imagePicker = a => {
    return e => {
      let gallery = this.state.fields[e.target.name];
      let imagePicker =
        this.state.imagePicker[0] === e.target.name
          ? false
          : [e.target.name, gallery];
      e.preventDefault();
      this.setState({ imagePicker });
    };
  };
  saveGallery = nameID => {
    return gallery => {
      let fields = this.state.fields;
      fields[nameID] = gallery;

      let imagePicker = false;
      this.setState({ fields, imagePicker });
    };
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.createDocument}>Save</button>

        <form id="createDocument">
          {this.state.fieldsData.map((fieldData, index) => {
            return fieldTypes[fieldData.type](
              fieldData,
              this.state.fields[fieldData.nameID]
                ? this.state.fields[fieldData.nameID]
                : "",
              this.setValue(fieldData.nameID),
              index,
              this.imagePicker(fieldData)
            );
          })}
        </form>

        {this.state.imagePicker ? (
          <ImageLibraryPicker.Retrieve
            saveGallery={this.saveGallery(this.state.imagePicker[0])}
            gallery={this.state.imagePicker[1]}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Create;
