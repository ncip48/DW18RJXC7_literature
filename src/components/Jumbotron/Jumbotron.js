import React from "react";
import "./style.css";

export const Jumbotron = (props) => {
  return (
    <div className="jumbotron m-0 d-flex justify-content-center flex-column">
      <div className="row">
        <div className="col-12 col-md-6 jumbotron-inner">
          <h1>
            source <i>of </i>
            intelligence
          </h1>
          <h5>
            Sign-up and receive unlimited accesss to all of your literatur -
            share your literature.
          </h5>
          <div className="row">
            <div className="col-6 col-md-4">
              <button
                className="btn btn-no btn-block btn-sign-up"
                onClick={props.register}
              >
                Sign Up
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="btn btn-no btn-block btn-sign-in"
                onClick={props.login}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
