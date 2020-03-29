import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatatypeMenu from "./../Collections/DatatypeMenu";
import UserRolesMenu from "./../UserRole/UserRolesMenu";

class innerMenu extends Component {
  state = { collections: [], content: "", userRoles: [] };

  componentDidMount() {
    let content = "";
    if (this.props.content) {
      content = this.props.content;
    }

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
        this.setState({ collections, content });
      });
  }

  Content = () => {
    switch (this.state.content) {
      case "collections":
        return (
          <nav className="innerMenu">
            <ul>
              {this.state.collections.map(collection => {
                return (
                  <Link
                    key={collection.nameID}
                    to={"/collections/update/" + collection._id}
                  >
                    <li>{collection.name}</li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        );
      case "dataTypes":
        return <DatatypeMenu addField={this.props.event} />;
      case "userRoles":
        return <UserRolesMenu />;
      default:
        return null;
    }
  };
  render() {
    return <this.Content />;
  }
}

export default innerMenu;
