import React, { useState } from "react";
import { Navbar } from "../components/Navbar/";
import { Sidebar } from "../components/Sidebar";
import { ListBook } from "../components/ListBook";
import CustomModal from "../components/CustomModal";
//import bookJson from "../assets/book.json";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

function MyLibrary() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const {
    isLoading,
    error,
    data: libraryData,
    refetch,
  } = useQuery("getLibrary", () => API.get(`/my-library`));

  const [removeLibraryAction] = useMutation(async (bookId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await API.delete(`/my-library/${bookId}`, config);
      setMessage(res.data.message);
      refetch();
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error.message);
    }
  });

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mb-5 d-flex flex-column">
            <Sidebar />
          </div>
          <div className="col-md-9 mb-5">
            <h1 style={style.txtList} className="mb-4">
              My Library
            </h1>
            <div className="row">
              {isLoading ? (
                <h1>Loading...</h1>
              ) : error ? (
                <h3>Error</h3>
              ) : libraryData.data.data.library.toString() === "" ? (
                <div
                  className="alert alert-warning ml-auto mr-auto w-100 text-center"
                  role="alert"
                >
                  <h3>No Library Found</h3>
                </div>
              ) : (
                libraryData.data.data.library.map((book, index) => {
                  return book.books.status === "Approved" ? (
                    <ListBook
                      isactive
                      key={index}
                      index={book.books.id}
                      image={book.books.thumbnail}
                      title={book.books.title}
                      author={book.books.userId.fullName}
                      myown
                      handleRemove={() => {
                        removeLibraryAction(book.books.id);
                        setShow(true);
                      }}
                    />
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomModal show={show} onHide={() => setShow(false)}>
        <h5 style={style.popup}>{message}</h5>
      </CustomModal>
    </>
  );
}

const style = {
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  popup: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    textAlign: "center",
    color: "#469F74",
  },
};
export default MyLibrary;
