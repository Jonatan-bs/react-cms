import React from "react";

export const string = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <input
        name={fieldData.nameID}
        type={fieldData.type}
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        value={getValue}
      ></input>
    </React.Fragment>
  );
};

export const text = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <textarea
        name={fieldData.nameID}
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        value={getValue}
      ></textarea>
    </React.Fragment>
  );
};

export const image = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <input
        name={fieldData.nameID}
        type="file"
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        file={getValue}
      ></input>
    </React.Fragment>
  );
};

export const number = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <input
        name={fieldData.nameID}
        type={fieldData.type}
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        value={getValue}
      ></input>
    </React.Fragment>
  );
};
export const radio = (fieldData, getValue, setValue, index) => {
  return fieldData.options.map((option, index) => {
    return (
      <React.Fragment key={index}>
        <label htmlFor={option.name}>{option.value}</label>
        <input
          type="radio"
          name={fieldData.nameID}
          key={fieldData.nameID + index}
          id={option.name}
          onChange={setValue}
          value={getValue}
        ></input>
      </React.Fragment>
    );
  });
};
export const select = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <select
        name={fieldData.nameID}
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        value={getValue}
      >
        {fieldData.options.map((option, index) => {
          return (
            <option key={fieldData.nameID + index} value={option.name}>
              {option.value}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export const boolean = (fieldData, getValue, setValue, index) => {
  return (
    <React.Fragment key={index}>
      <label htmlFor={fieldData.nameID}>{fieldData.nameID}</label>
      <input
        name={fieldData.nameID}
        key={fieldData.nameID}
        id={fieldData.nameID}
        onChange={setValue}
        value={getValue}
      ></input>
    </React.Fragment>
  );
};
