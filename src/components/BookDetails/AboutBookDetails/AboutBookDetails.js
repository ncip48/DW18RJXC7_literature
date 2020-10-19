import React from "react";
import "./style.css";

export const AboutBookDetails = (props) => {
  return (
    <div className="d-flex justify-content-between flex-column">
      <h1 className="about-book">About This Book</h1>
      <p className="text-justify p-about">{props.text}</p>
    </div>
  );
};
