import React, { Component } from "react";
import { Link } from "react-router-dom";

class Retrieve extends Component {
  state = { collection: [], ccData: [], rewriteObj: {}, fieldTypeObj: {} };

  updateState(props) {
    let collection;
    if (props) {
      collection = props.match.params.collection;
    } else {
      collection = this.props.match.params.collection;
    }
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
  }

  componentDidUpdate(props) {
    this.updateState(props);
  }
  componentDidMount() {
    this.updateState();
  }

  Documents = props => {
    return this.state.collection.map((document, index) => {
      return (
        <React.Fragment key={index}>
          <Link
            to={
              "/cc/" + this.props.match.params.collection + "/" + document._id
            }
          >
            <div key={index}>
              {Object.keys(document).map((label, index) =>
                label === "_id" ? null : this.state.fieldTypeObj[label] ===
                  "image" ? (
                  <React.Fragment key={index}>
                    <p>{this.state.rewriteObj[label]}</p>
                    {document[label].map((img, index) => {
                      return (
                        <img
                          alt={img.alt}
                          src={
                            "http://localhost:4000/admin/uploads/" +
                            img.imageID.filename
                          }
                        />
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <p>{this.state.rewriteObj[label]}</p>
                    <p>{document[label]}</p>
                  </React.Fragment>
                )
              )}
            </div>
          </Link>
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <Link to={"/cc/" + this.props.match.params.collection + "/create"}>
          <button>Add document</button>
        </Link>

        <this.Documents />
      </React.Fragment>
    );
  }
}

export default Retrieve;
