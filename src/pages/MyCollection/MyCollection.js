import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navbar, Wrapper } from "../../components";
import { ListBook } from "../../components/ListBook";
import CustomModal from "../../components/CustomModal";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";

export const MyCollection = () => {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const { isLoading, data: collectionData, refetch } = useQuery(
    "getCollection",
    () => API.get(`/collection/${state.user.id}`)
  );

  const [removeLibraryAction] = useMutation(async (bookId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await API.delete(`/collection/${bookId}`, config);
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
        <div className="col-md-12">
          <h1 style={style.txtList} className="mb-4">
            My Collection
          </h1>
          <div className="row">
            {isLoading ? (
              <h3 className="text-white">loading...</h3>
            ) : collectionData.data.data.collections.toString() === "" ? (
              <div
                className="alert ml-auto mr-auto w-100 text-center mt-5 text-white"
                role="alert"
              >
                <h3>No Literatures Found</h3>
              </div>
            ) : (
              collectionData.data.data.collections.map((literature, index) => {
                return literature.literatures.status === "Approved" ? (
                  <ListBook
                    isactive
                    key={index}
                    index={literature.literatures.id}
                    image={literature.literatures.thumbnail}
                    title={literature.literatures.title}
                    author={literature.literatures.author}
                    year={literature.literatures.publication_date
                      .split(" ")
                      .pop()}
                    myown
                    handleRemove={() => {
                      setShow(true);
                      removeLibraryAction(literature.literatures.id);
                    }}
                  />
                ) : null;
              })
            )}
          </div>
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
    color: "#ffffff",
  },
};
