import React from "react";
import "./style.css";
import { BsCloudDownload } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { urlAsset } from "../../../config/api";

export const CardBookDetails = (props) => {
  return (
    <div
      className="card w-100"
      style={{ borderWidth: 0, backgroundColor: "transparent" }}
    >
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center flex-column img-books">
          <img
            alt="book"
            className="figure-img img-fluid thumbnail"
            src={urlAsset.img + props.thumbnail}
          />
        </div>
        <div className="col-md-8 d-flex justify-content flex-column justify-content-between detail-books">
          <div className="d-flex justify-content-between">
            <h1 className="title">{props.title}</h1>
            <button
              type="button"
              className="btn btn-primary mx-2"
              style={{ backgroundColor: "#AF2E1C", height: 50 }}
              onClick={props.onCollection}
            >
              Add My Collection <FaRegBookmark />
            </button>
          </div>

          <h5 className="author">{props.author}</h5>
          <h6>Publication Date</h6>
          <p>{props.publication}</p>
          <h6>Pages</h6>
          <p>{props.pages}</p>
          <h6 className="isbn">ISBN</h6>
          <p className="isbn-p">{props.ISBN}</p>
          <a
            className="btn btn-primary d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#AF2E1C", height: 50, width: 145 }}
            href={urlAsset.books + props.file}
          >
            Download <BsCloudDownload />
          </a>
        </div>
      </div>
    </div>
  );
};
