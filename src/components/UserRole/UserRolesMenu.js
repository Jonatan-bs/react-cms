import React, { Component } from "react";

class UserRoles extends Component {
  render() {
    return (
      <div id="sidemenu" className="fieldTypes">
        <ul>
          {this.props.userRoles.map((role, index) => {
            return (
              <li key={index} onClick={this.props.setUserRole(role)}>
                {role.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UserRoles;
