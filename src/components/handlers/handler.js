export function test() {
  return this;
}

export function addField(fieldType) {
  return () => {
    const fields = [...this.state.fields];
    if (fieldType === "options") {
      fields.push({
        fieldType: fieldType,
        values: {
          name: "",
          nameID: "",
          required: false,
          unique: false,
          type: "select",
          options: []
        }
      });
    } else if (fieldType === "image") {
      fields.push({
        fieldType: fieldType,
        values: {
          name: "",
          nameID: "",
          multi: false,
          required: false,
          unique: false,
          type: fieldType
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
export function addGroup(index) {
  return () => {
    const fields = [...this.state.fields];
    fields[index].values.options.push({ name: "", value: "" });
    this.setState({ fields });
  };
}
export function removeGroup(index) {
  return groupIndex => {
    return () => {
      const fields = [...this.state.fields];
      fields[index].values.options.splice(groupIndex, 1);
      this.setState({ fields });
    };
  };
}
export function removeField(index) {
  return () => {
    const fields = [...this.state.fields];
    fields.splice(index, 1);
    this.setState({ fields });
  };
}
export function setValue(index) {
  const fields = [...this.state.fields];

  return (type = "single", nestedIndex, setNameID) => {
    if (type === "group") {
      return event => {
        fields[index].values.options[nestedIndex][event.target.name] =
          event.target.value;

        this.setState({ fields });
      };
    } else if (type === "single") {
      return event => {
        if (event.target.type === "checkbox") {
          fields[index].values[event.target.name] = event.target.checked;
        } else if (event.target.type === "radio") {
          fields[index].values.type = event.target.value;
        } else {
          fields[index].values[event.target.name] = event.target.value;

          if (setNameID) {
            fields[index].values["nameID"] = string2id(event.target.value);
          }
        }
        this.setState({ fields });
      };
    }
  };
}
export function setValueMain(name, setNameID) {
  return event => {
    const collectionData = { ...this.state.collectionData };
    collectionData[name] = event.target.value;

    if (setNameID) {
      collectionData["nameID"] = string2id(event.target.value);
    }
    this.setState({ collectionData });
  };
}
export function getValue(index) {
  const fields = this.state.fields;
  return (name, type = "single", nestedIndex, value) => {
    if (type === "group") {
      return fields[index].values.options[nestedIndex][name];
    } else if (type === "single") {
      return fields[index].values[name];
    } else if (type === "checkbox") {
      if (fields[index].values[name]) {
        return fields[index].values[name];
      } else {
        return false;
      }
    } else if (type === "radio") {
      return fields[index].values[name] === value;
    }
  };
}

//// convert string to Id
function string2id(input) {
  return input.replace(/\W/g, "_").toLowerCase();
}
