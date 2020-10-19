import React from "react";

export const TextInput = (props) => {
  return (
    <div className="form-group" style={{ marginTop: 20 }}>
      <input {...props} className="form-control" style={props.style} />
      <span className="help-block text-danger">{props.error}</span>
    </div>
  );
};
