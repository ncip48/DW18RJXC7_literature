import React from "react";
import { useHistory } from "react-router-dom";
import { urlAsset } from "../config/api";

export const ListBook = ({
  index,
  image,
  title,
  author,
  isactive,
  myown,
  handleRemove,
}) => {
  const history = useHistory();
  const style = {
    bookTitle: {
      fontFamily: "Times New Roman",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: 22,
      lineHeight: "120.5%",
      marginTop: 10,
      opacity: isactive ? 1 : "0.5",
      marginBottom: 10,
    },
    txtAuthor: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 18,
      lineHeight: "101.5%",
      margin: 0,
      opacity: isactive ? 1 : "0.5",
      color: "#929292",
    },
  };
  return (
    <div
      className="col-md-3 d-flex flex-column py-3"
      style={{
        cursor: isactive ? "pointer" : "default",
        backgroundColor: isactive ? "white" : "rgb(196,196,196,0.7)",
        maxWidth: 230,
      }}
    >
      {myown ? (
        <div
          style={{
            position: "absolute",
            top: 20,
            marginLeft: "auto",
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "grey",
            color: "white",
            textAlign: "center",
            right: 20,
          }}
          className="d-flex justify-content-center align-items-center"
          onClick={handleRemove}
        >
          X
        </div>
      ) : null}
      <div onClick={() => (isactive ? history.push(`/book/${index}`) : null)}>
        <img
          alt="books"
          className="figure-img img-fluid"
          src={urlAsset.img + image}
          style={{
            height: 270,
            width: 200,
            opacity: isactive ? 1 : "0.5",
            borderRadius: 10,
          }}
        />
        <h4 style={style.bookTitle}>{title}</h4>
        <h6 style={style.txtAuthor}>{author}</h6>
      </div>
    </div>
  );
};
