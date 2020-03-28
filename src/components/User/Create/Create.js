import React, { Component } from "react";
import InnerMenu from "./../../innerMenu/innerMenu";

class Create extends Component {
  state = { user: { firstname: "", lastname: "", email: "", password: "" } };
  setValue = name => {
    return event => {
      const user = { ...this.state.user };
      user[name] = event.target.value;
      this.setState({ user });
    };
  };
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
      </React.Fragment>
    );
  }
}

export default Create;
