import React from "react";
import "./style.css";
import { urlAsset } from "../../../config/api";

export const CardBookDetails = (props) => {
  return (
    <div className="card w-100" style={{ borderWidth: 0 }}>
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center flex-column img-books">
          <img
            alt="book"
            className="figure-img img-fluid thumbnail"
            src={urlAsset.img + props.thumbnail}
          />
        </div>
        <div className="col-md-8 d-flex justify-content flex-column justify-content-between detail-books">
          <h1 className="title">{props.title}</h1>
          <h5 className="author">{props.author}</h5>
          <h6>Publication Date</h6>
          <p>{props.publication}</p>
          <h6>Category</h6>
          <p>{props.category}</p>
          <h6>Pages</h6>
          <p>{props.pages}</p>
          <h6 className="isbn">ISBN</h6>
          <p className="isbn-p">{props.ISBN}</p>
        </div>
      </div>
    </div>
  );
};
