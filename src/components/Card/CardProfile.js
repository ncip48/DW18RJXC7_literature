import React from "react";
import { urlAsset } from "../../config/api";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTransgender,
} from "react-icons/fa";

export const CardProfile = (props) => {
  return (
    <div className="card w-100 p-1" style={{ backgroundColor: "#252525" }}>
      <div className="card-body">
        <div className="row">
          {props.loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <div className="col-md-9 d-flex justify-content-around flex-column">
                <div className="d-flex flex-row align-items-center">
                  <FaEnvelope
                    style={{ marginRight: 15 }}
                    size={30}
                    color="#AF2E1C"
                  />
                  <div className="flex-column">
                    <h6 style={style.sub}>{props.data.data.data.user.email}</h6>
                    <p style={style.subsub}>email</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaTransgender
                    style={{ marginRight: 15 }}
                    size={30}
                    color="#AF2E1C"
                  />
                  <div className="flex-column">
                    <h6 style={style.sub}>
                      {props.data.data.data.user.gender}
                    </h6>
                    <p style={style.subsub}>Gender</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaPhoneAlt
                    style={{ marginRight: 15 }}
                    size={30}
                    color="#AF2E1C"
                  />
                  <div className="flex-column">
                    <h6 style={style.sub}>{props.data.data.data.user.phone}</h6>
                    <p style={style.subsub}>Mobile Phone</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaMapMarkerAlt
                    style={{ marginRight: 15 }}
                    size={30}
                    color="#AF2E1C"
                  />
                  <div className="flex-column">
                    <h6 style={style.sub}>
                      {props.data.data.data.user.address}
                    </h6>
                    <p style={{ ...style.subsub, margin: 0 }}>Address</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex my-2 flex-column justify-content-center align-items-center">
                <img
                  alt="book"
                  className="figure-img img-fluid rounded"
                  src={
                    props.data.data.data.user.photoProfile === null
                      ? require("../../assets/img/blank.png")
                      : urlAsset.img + props.data.data.data.user.photoProfile
                  }
                  style={{ height: 200, width: 200 }}
                />
                <div className="form-group">
                  <label
                    htmlFor="file"
                    className="btn btn-no"
                    style={{
                      display: "flex",
                      height: 50,
                      backgroundColor: "#AF2E1C",
                      color: "#ffffff",
                      alignItems: "center",
                    }}
                    onClick={props.handleEdit}
                  >
                    Change Photo Picture
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const style = {
  txtJudul: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 70,
    lineHeight: "101.5%",
    marginBottom: 10,
  },
  txtSub: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    lineHeight: "101.5%",
  },
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  sub: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 18,
    color: "#ffffff",
    margin: 0,
  },
  subsub: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    color: "#8A8C90",
    margin: 0,
  },
};
