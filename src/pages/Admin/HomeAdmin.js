import React from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { Navbar } from "../../components/Navbar/";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function HomeAdmin() {
  const {
    isLoading,
    error,
    data: literatureData,
    refetch,
  } = useQuery("getLiteratureAll", () => API.get(`/literatures`));

  const [approveBook] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ status: "Approved" });
      await API.patch(`/literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  const [cancelBook] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ status: "Canceled" });
      await API.patch(`/literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-3" style={style.title}>
          Literature verification
        </h1>
        <table className="table text-white">
          <thead>
            <tr>
              <th>No</th>
              <th>Users of Author</th>
              <th>Title</th>
              <th>ISBN</th>
              <th>E-book</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <h3>Loading</h3>
                </td>
              </tr>
            ) : error ? (
              <h3>Error {error.message}</h3>
            ) : (
              literatureData.data.data.literatures.map((book, index) => {
                return (
                  <tr key={index}>
                    <th>{1 + index}</th>
                    <td>{book.author}</td>
                    <td>
                      <b>{book.title}</b>
                    </td>
                    <td>{book.isbn}</td>
                    <td>{book.attache}</td>
                    <td
                      style={{
                        color:
                          book.status === "Approved"
                            ? "#0ACF83"
                            : book.status === "Canceled"
                            ? "#FF0742"
                            : "#F7941E",
                      }}
                    >
                      {book.status === "Approved"
                        ? "Active"
                        : book.status === "Canceled"
                        ? "Cancel"
                        : "Waiting to be verified"}
                    </td>
                    <td>
                      {book.status === "Approved" ? (
                        <HiCheckCircle size={40} color="#3BB54A" />
                      ) : book.status === "Canceled" ? (
                        <HiXCircle size={40} color="#FF0742" />
                      ) : (
                        <>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ marginRight: 10 }}
                            onClick={() => cancelBook(book.id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => approveBook(book.id)}
                          >
                            Approve
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const style = {
  title: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 34,
    color: "#ffffff",
  },
};

export default HomeAdmin;
