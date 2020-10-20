import React, { useContext, useState } from "react";
import { Navbar, Wrapper, CardProfile } from "../../components/";
import CustomModal from "../../components/CustomModal";
import { ListBook } from "../../components/ListBook";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { EditPhotoProfile } from "./EditPhotoProfile";

//const URI = "http://localhost:5000/src/uploads/img/";

export const Profile = () => {
  const [state] = useContext(UserContext);
  const [showEditPP, setShowEditPP] = useState(false);

  const { isLoading, error, data: booksProfile } = useQuery(
    "getUserBooks",
    () => API.get(`/user/${state.user.id}`)
  );

  return (
    <>
      <Navbar />
      <Wrapper>
        <CardProfile
          email={state.user.email}
          gender={state.user.gender}
          phone={state.user.phone}
          address={state.user.address}
          photo={state.user.photoProfile}
          handleEdit={() => setShowEditPP(true)}
        />
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
      </Wrapper>
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
};

const style = {
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
    color: "#ffffff",
  },
};
