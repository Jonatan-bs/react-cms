import React from "react";

export const boolean = props => {
  return (
    <div className="field">
      <p>Boolean</p>
      <input type="hidden" value="boolean" name="dataType" />
      <input type="hidden" value="checkbox" name="fieldType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const image = props => {
  return (
    <div className="field">
      <p>Image</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="image" name="fieldType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
        <label htmlFor="multi">Multi</label>
        <input
          type="checkbox"
          name="multi"
          onChange={props.setValue("single")}
          checked={props.getValue("multi", "checkbox")}
        />
      </div>

      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const number = props => {
  return (
    <div className="field">
      <p>Number</p>
      <input type="hidden" value="number" name="dataType" />
      <input type="hidden" value="number" name="fieldType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const options = props => {
  return (
    <div className="field">
      <p>Options</p>
      <input type="hidden" value="string" name="dataType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
        <label htmlFor="fieldType">select</label>
        <input
          type="radio"
          value="select"
          name={"type" + props.index}
          onChange={props.setValue("single")}
          checked={props.getValue("type", "radio", null, "select")}
        />
        <label htmlFor="fieldType">radio</label>
        <input
          type="radio"
          value="radio"
          name={"type" + props.index}
          onChange={props.setValue("single")}
          checked={props.getValue("type", "radio", null, "radio")}
        />
        <div className="groupWrap">
          <button onClick={props.addGroup}>Add option</button>
          {props.options.map((x, index) => {
            return (
              <div
                className="group"
                key={"field" + props.index + "group" + index}
              >
                <label htmlFor="optionName">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={props.setValue("group", index)}
                  value={props.getValue("name", "group", index)}
                />
                <label htmlFor="optionValue">Value</label>
                <input
                  type="text"
                  name="value"
                  onChange={props.setValue("group", index)}
                  value={props.getValue("value", "group", index)}
                />
                <button onClick={props.removeGroup(index)}>
                  Remove option
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const string = props => {
  return (
    <div className="field">
      <p>String</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="string" name="fieldType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};

export const text = props => {
  return (
    <div className="field">
      <p>Text</p>
      <input type="hidden" value="string" name="dataType" />
      <input type="hidden" value="text" name="fieldType" />
      <input
        className="name"
        placeholder="name"
        type="text"
        name="name"
        onChange={props.setValue("single", null, true)}
        value={props.getValue("name")}
      />
      <input
        className="nameID"
        placeholder="nameID"
        type="text"
        name="nameID"
        onChange={props.setValue("single")}
        value={props.getValue("nameID")}
      />
      <div className="extra">
        <label htmlFor="required">Required</label>
        <input
          type="checkbox"
          name="required"
          onChange={props.setValue("single")}
          checked={props.getValue("required", "checkbox")}
        />
        <label htmlFor="unique">Unique</label>
        <input
          type="checkbox"
          name="unique"
          onChange={props.setValue("single")}
          checked={props.getValue("unique", "checkbox")}
        />
      </div>
      <p onClick={props.removeField}>remove</p>
    </div>
  );
};
