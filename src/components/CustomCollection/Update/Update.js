import React, { Component } from "react";

class Update extends Component {
  state = {};

  componentDidMount() {
    const collection = this.props.match.params.collection;
    fetch("http://localhost:4000/admin/cc/" + collection, {
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
      .then(collection => {
        this.setState({ collection });
      });
  }
  render() {
    return <p>Update Docs</p>;
  }
}

export default Update;
