import React from "react";

const String = props => {
  return (
    <div className="field">
      <p>String</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="string" name="fieldType" />
      <input className="name" placeholder="name" type="text" name="name" />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input type="checkbox" name="required" />
        <label htmlFor="unique">Unique</label>
        <input type="checkbox" name="unique" />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export default String;
