import React from "react";
import { ListBook } from "../ListBook";

export const CardBook = (props) => {
  const pathname = window.location.pathname.split("/")[1];
  return (
    <div className="row">
      {props.loading ? (
        <h1>Loading...</h1>
      ) : props.dataBook.toString() === "" ? (
        <div
          className="alert ml-auto mr-auto w-100 text-center mt-5 text-white"
          role="alert"
        >
          <h3>No Literatures Found</h3>
        </div>
      ) : (
        props.dataBook.map((literature, index) => {
          console.log(literature.literatures);
          if (pathname === "profile") {
            return literature.status !== "Canceled" ? (
              <ListBook
                isactive={literature.status === "Waiting" ? false : true}
                key={index}
                index={literature.id}
                image={literature.thumbnail}
                title={literature.title}
                author={literature.author}
                year={literature.publication_date.split(" ").pop()}
              />
            ) : null;
          } else if (pathname === "literatures") {
            return literature.status === "Approved" ? (
              <ListBook
                isactive
                key={index}
                index={literature.id}
                image={literature.thumbnail}
                title={literature.title}
                author={literature.author}
                year={literature.publication_date.split(" ").pop()}
              />
            ) : null;
          } else {
            return literature.literatures.status === "Approved" ? (
              <ListBook
                isactive
                key={index}
                index={literature.literatures.id}
                image={literature.literatures.thumbnail}
                title={literature.literatures.title}
                author={literature.literatures.author}
                year={literature.literatures.publication_date.split(" ").pop()}
                myown={props.isMeAuthor}
                handleRemove={props.handleRemove()}
              />
            ) : null;
          }
        })
      )}
    </div>
  );
};
