import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import { CardBookDetails, Navbar, Wrapper } from "../../components";

export const DetailLiterature = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const { isLoading, error, data: booksData } = useQuery("getBooks", () =>
    API.get(`/literature/${id}`)
  );

  const [addCollection] = useMutation(async (literatureId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ literatureId: literatureId });

      const res = await API.post(`/collection/`, body, config);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.error.message);
    }
  });

  return (
    <>
      <Navbar />
      <Wrapper>
        {isLoading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          <>
            <CardBookDetails
              title={booksData.data.data.literature.title}
              author={booksData.data.data.literature.author}
              publication={booksData.data.data.literature.publication_date}
              pages={booksData.data.data.literature.pages}
              ISBN={booksData.data.data.literature.isbn}
              thumbnail={booksData.data.data.literature.thumbnail}
              file={booksData.data.data.literature.attache}
              onCollection={() => {
                addCollection(booksData.data.data.literature.id);
                setShow(true);
              }}
            />
          </>
        )}
      </Wrapper>
      <CustomModal show={show} onHide={() => setShow(false)}>
        <h5 style={style.popup}>{message}</h5>
      </CustomModal>
    </>
  );
};

const style = {
  popup: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
  },
};
