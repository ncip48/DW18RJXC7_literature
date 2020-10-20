import React from "react";

export const Wrapper = (props) => {
  return (
    <div style={{ backgroundColor: "#161616", height: "100vh", width: "100%" }}>
      <div className="container pt-5">{props.children}</div>
    </div>
  );
};
