import React, { Component } from "react";
import { Link } from "react-router-dom";

class Retrieve extends Component {
  state = { collection: [], ccData: [], rewriteObj: {}, fieldTypeObj: {} };
  componentDidMount() {
    const collection = this.props.match.params.collection;

    Promise.all([
      fetch("http://localhost:4000/admin/cc/" + collection, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: "",
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
        let collection = response[0];
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

        this.setState({ collection, ccData, rewriteObj, fieldTypeObj });
      })
      .catch(err => console.log(err));

    // fetch("http://localhost:4000/admin/cc/" + collection, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     query: "",
    //     fields: "",
    //     options: null
    //   })
    // })
    //   .then(response => response.json())
    //   .then(collection => {
    //     this.setState({ collection });
    //   });
  }
  render() {
    return this.state.collection.map((document, index) => {
      return (
        <Link
          to={"/cc/" + this.props.match.params.collection + "/" + document._id}
        >
          <div key={index}>
            {Object.keys(document).map((label, index) =>
              label === "_id" ? null : this.state.fieldTypeObj[label] ===
                "image" ? (
                <React.Fragment key={index}>
                  <p>{this.state.rewriteObj[label]}</p>
                  <img
                    alt=""
                    src={
                      "http://localhost:4000/admin/uploads/" +
                      document[label].filename
                    }
                  />
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <p>{this.state.rewriteObj[label]}</p>
                  <p>{document[label]}</p>
                </React.Fragment>
              )
            )}{" "}
          </div>
        </Link>
      );
    });
  }
}

export default Retrieve;
