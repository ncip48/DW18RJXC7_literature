import React, { useContext, useState } from "react";
import { Navbar } from "../components/Navbar/";
import CustomModal from "../components/CustomModal";
import { Sidebar } from "../components/Sidebar";
import { ListBook } from "../components/ListBook";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API, urlAsset } from "../config/api";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTransgender,
} from "react-icons/fa";
import { EditPhotoProfile } from "./Profile/EditPhotoProfile";

//const URI = "http://localhost:5000/src/uploads/img/";

function Profile() {
  const [state] = useContext(UserContext);
  const [showEditPP, setShowEditPP] = useState(false);

  const { isLoading, error, data: booksProfile } = useQuery(
    "getUserBooks",
    () => API.get(`/user/${state.user.id}`)
  );

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mb-5 d-flex flex-column">
            <Sidebar />
          </div>
          <div className="col-md-9 mb-5">
            <div className="mb-3">
              <div
                className="card w-100 p-1"
                style={{ backgroundColor: "#FDEDE6" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-9 d-flex justify-content-around flex-column">
                      <div className="d-flex flex-row align-items-center">
                        <FaEnvelope
                          style={{ marginRight: 15 }}
                          size={30}
                          color="#8A8C90"
                        />
                        <div className="flex-column">
                          <h6 style={style.sub}>{state.user.email}</h6>
                          <p style={style.subsub}>email</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <FaTransgender
                          style={{ marginRight: 15 }}
                          size={30}
                          color="#8A8C90"
                        />
                        <div className="flex-column">
                          <h6 style={style.sub}>{state.user.gender}</h6>
                          <p style={style.subsub}>Gender</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <FaPhoneAlt
                          style={{ marginRight: 15 }}
                          size={30}
                          color="#8A8C90"
                        />
                        <div className="flex-column">
                          <h6 style={style.sub}>{state.user.phone}</h6>
                          <p style={style.subsub}>Mobile Phone</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <FaMapMarkerAlt
                          style={{ marginRight: 15 }}
                          size={30}
                          color="#8A8C90"
                        />
                        <div className="flex-column">
                          <h6 style={style.sub}>{state.user.address}</h6>
                          <p style={{ ...style.subsub, margin: 0 }}>Address</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex my-2 flex-column justify-content-center align-items-center">
                      <img
                        alt="book"
                        className="figure-img img-fluid rounded"
                        src={
                          state.user.photoProfile === null
                            ? require("../assets/img/blank.png")
                            : urlAsset.img + state.user?.photoProfile
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
                            backgroundColor: "#EE4622",
                            color: "#ffffff",
                            alignItems: "center",
                          }}
                          onClick={() => setShowEditPP(true)}
                        >
                          Change Photo Picture
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h1 style={style.txtList}>My Books</h1>
            </div>
            <div className="row">
              {isLoading ? (
                <h1>Loading...</h1>
              ) : error ? (
                <h3>Error</h3>
              ) : booksProfile.data.data.user.books.toString() === "" ? (
                <div
                  className="alert alert-warning ml-auto mr-auto w-100 text-center"
                  role="alert"
                >
                  <h3>No Books Found</h3>
                </div>
              ) : (
                booksProfile.data.data.user.books.map((book, index) => {
                  return book.status !== "Canceled" ? (
                    <ListBook
                      isactive={book.status === "Waiting" ? false : true}
                      key={index}
                      index={book.id}
                      image={book.thumbnail}
                      title={book.title}
                      author={state.user.fullName}
                    />
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        title="Edit Photo Profile"
        width={700}
        show={showEditPP}
        onHide={() => setShowEditPP(false)}
      >
        <EditPhotoProfile />
      </CustomModal>
    </>
  );
}

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
    margin: 0,
  },
  subsub: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    color: "#929292",
    margin: 0,
  },
};

export default Profile;
