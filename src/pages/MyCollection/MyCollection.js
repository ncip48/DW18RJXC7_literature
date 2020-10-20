import React, { useState } from "react";
import { Navbar, Wrapper, CardBook } from "../../components";
import CustomModal from "../../components/CustomModal";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";

export const MyCollection = () => {
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
      <Wrapper>
        <div className="col-md-9 mb-5">
          <h1 style={style.txtList} className="mb-4">
            My Collection
          </h1>
          <CardBook
            loading={isLoading}
            dataBook={libraryData?.data?.data?.library}
            handleRemove={removeLibraryAction()}
          />
        </div>
      </Wrapper>
      <CustomModal show={show} onHide={() => setShow(false)}>
        <h5 style={style.popup}>{message}</h5>
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
    fontSize: 36,
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
