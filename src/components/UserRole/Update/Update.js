import React, { Component } from "react";
import InnerMenu from "./../../innerMenu/innerMenu";

class Update extends Component {
  state = { collections: [], userRole: {}, permissions: [], userRoles: [] };
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:4000/admin/userrole", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: { name: { $ne: "master" } },
          fields: "-__v ",
          options: null
        })
      }),
      fetch("http://localhost:4000/admin/ccData", {
        method: "post"
      })
    ])
      .then(responses => {
        return Promise.all(
          responses.map(response => {
            return response.json();
          })
        );
      })
      .then(data => {
        const collections = data[1];
        const userRoles = data[0];

        const permissions = userRoles[0].permissions;

        for (let i = 0; i < collections.length; i++) {
          const collection = collections[i];

          if (permissions.find(p => p.collectionID === collection._id))
            continue;

          permissions.push({
            collectionID: collection._id,
            find: false,
            findOne: false,
            create: false,
            delete: false,
            update: false
          });
        }

        this.setState({
          collections,
          permissions,
          userRoles,
          userRole: userRoles[0]
        });
      })
      .catch(err => console.log(err));
  }
  setUserRole = userRole => {
    return () => {
      const collections = this.state.collections;
      const permissions = userRole.permissions;

      for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];

        if (permissions.find(p => p.collectionID === collection._id)) continue;

        permissions.push({
          collectionID: collection._id,
          find: false,
          findOne: false,
          create: false,
          delete: false,
          update: false
        });
      }

      this.setState({ userRole, permissions });
    };
  };
  getValue = (id, name) => {
    let permissions = this.state.permissions;
    const index = permissions.findIndex(p => p.collectionID === id);
    if (index < 0) return false;
    return permissions[index][name];
  };
  setValue = (id, name) => {
    return event => {
      let permissions = [...this.state.permissions];
      const index = permissions.findIndex(p => p.collectionID === id);
      const value = event.target.checked;
      permissions[index][name] = value;
      this.setState({ permissions });
    };
  };
  updateRole = () => {
    const id = this.state.userRole._id;

    const data = { ...this.state.userRole };
    data.permissions = this.state.permissions;

    fetch("http://localhost:4000/admin/userrole/update/" + id, {
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
    return this.state.collections.length === 0 ? (
      <p>There has to be at least one collection, to set permissions</p>
    ) : (
      <React.Fragment>
        <section className="innerMenuContent">
          <InnerMenu
            content="userRoles"
            setUserRole={this.setUserRole}
            userRoles={this.state.userRoles}
          />

          <p>{this.state.userRole.name}</p>
          {this.state.collections.map((collection, index) => {
            return (
              <div key={"col" + index}>
                <p>{collection.name}</p>

                <label htmlFor={"find" + index}>find</label>
                <input
                  type="checkbox"
                  value="find"
                  id={"find" + index}
                  checked={this.getValue(collection._id, "find")}
                  onChange={this.setValue(collection._id, "find")}
                />

                <label htmlFor={"findOne" + index}>findOne</label>
                <input
                  type="checkbox"
                  value="findOne"
                  id={"findOne" + index}
                  checked={this.getValue(collection._id, "findOne")}
                  onChange={this.setValue(collection._id, "findOne")}
                />

                <label htmlFor={"create" + index}>create</label>
                <input
                  type="checkbox"
                  value="create"
                  id={"create" + index}
                  checked={this.getValue(collection._id, "create")}
                  onChange={this.setValue(collection._id, "create")}
                />

                <label htmlFor={"delete" + index}>delete</label>
                <input
                  type="checkbox"
                  value="delete"
                  id={"delete" + index}
                  checked={this.getValue(collection._id, "delete")}
                  onChange={this.setValue(collection._id, "delete")}
                />

                <label htmlFor={"update" + index}>update</label>
                <input
                  type="checkbox"
                  value="update"
                  id={"update" + index}
                  checked={this.getValue(collection._id, "update")}
                  onChange={this.setValue(collection._id, "update")}
                />
              </div>
            );
          })}
          <button onClick={this.updateRole}>update role</button>
        </section>
      </React.Fragment>
    );
  }
}

export default Update;
