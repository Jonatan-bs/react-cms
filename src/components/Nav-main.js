import React, { Component } from "react";
import { Link } from "react-router-dom";

class mainNav extends Component {
  state = {
    collections: []
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
      .then(response => {
        this.setState({ collections: response });
      });
  }

  collectionClicked(a) {
    alert(a);
  }

  render() {
    return (
      <nav>
        <ul>
          <Link to="/user/create">
            <li>Users</li>
          </Link>
          <Link to="/collections">
            <li>Collections</li>
          </Link>

          {this.state.collections.map(collection => {
            return (
              <Link key={collection.nameID} to={"/cc/" + collection.nameID}>
                <li>{collection.name}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default mainNav;
