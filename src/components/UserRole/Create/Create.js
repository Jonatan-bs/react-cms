import React, { Component } from "react";
import InnerMenu from "../../innerMenu/innerMenu";

class Create extends Component {
  state = {
    user: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: ""
    },
    userRoles: []
  };
  setValue = name => {
    return event => {
      const user = { ...this.state.user };
      user[name] = event.target.value;
      this.setState({ user });
    };
  };
  // getValueSelect = name => {
  //   return event => {

  //   };
  // };
  createUser = e => {
    let data = this.state.user;
    fetch("http://localhost:4000/admin/user/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => console.log({ response }))
      .catch(err => console.log({ err }));
  };
  componentDidMount() {
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
    })
      .then(response => response.json())
      .then(userRoles => {
        const user = { ...this.state.user };
        user.role = userRoles[0]._id;
        this.setState({ userRoles, user });
        return;
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <InnerMenu content="" />
        <button onClick={this.createUser}>Create User</button>
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          id="firstname"
          onChange={this.setValue("firstname")}
          value={this.state.user.firstname}
        />
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          id="lastname"
          onChange={this.setValue("lastname")}
          value={this.state.user.lastname}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          onChange={this.setValue("email")}
          value={this.state.user.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={this.setValue("password")}
          value={this.state.user.password}
        />
        <label htmlFor="userRole">Role</label>
        <select
          type="userRole"
          id="userRole"
          onChange={this.setValue("role")}
          value={this.state.user.role}
        >
          {this.state.userRoles.map((role, index) => {
            return (
              <option key={"role" + index} value={role._id}>
                {role.name}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}

export default Create;
