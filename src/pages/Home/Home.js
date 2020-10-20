import React from "react";
import { Navbar, SearchBar } from "../../components";
import "./style.css";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="jumbotron-home m-0 d-flex justify-content-center flex-column">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12"></div>
            <div className="col-md-6 col-12">
              <img
                className="mx-auto d-block"
                src={require("../../assets/img/bg2.png")}
                alt=""
              />
              <SearchBar />
            </div>
            <div className="col-md-3 col-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};
