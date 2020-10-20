import React from "react";
import { Navbar, TextInput } from "../../components";
import { BsSearch } from "react-icons/bs";
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
              <div className=" d-flex flex-row" style={{ marginTop: 50 }}>
                <TextInput
                  name="literature"
                  type="text"
                  placeholder="Search for literature"
                  css={{ margin: 0, marginRight: 10, width: "90%" }}
                  style={{ height: 50, margin: 0 }}
                />
                <button className="btn btn-no btn-sign-up">
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="col-md-3 col-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};
