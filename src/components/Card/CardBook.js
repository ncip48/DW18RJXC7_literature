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
        props.dataBook.map((book, index) => {
          if (pathname === "profile") {
            return book.status !== "Canceled" ? (
              <ListBook
                isactive={book.status === "Waiting" ? false : true}
                key={index}
                index={props.isMeAuthor ? book.books.id : book.id}
                image={props.isMeAuthor ? book.books.thumbnail : book.thumbnail}
                title={props.isMeAuthor ? book.books.title : book.title}
                author={
                  props.author
                    ? props.author
                    : props.isMeAuthor
                    ? book.books.userId.fullName
                    : book.author
                }
                year={
                  props.isMeAuthor
                    ? book.books.publication_date.split(" ").pop()
                    : book.publication_date.split(" ").pop()
                }
                myown={props.isMeAuthor}
                handleRemove={props.handleRemove}
              />
            ) : null;
          } else {
            return book.status === "Approved" ? (
              <ListBook
                isactive
                key={index}
                index={props.isMeAuthor ? book.books.id : book.id}
                image={props.isMeAuthor ? book.books.thumbnail : book.thumbnail}
                title={props.isMeAuthor ? book.books.title : book.title}
                author={
                  props.author
                    ? props.author
                    : props.isMeAuthor
                    ? book.books.userId.fullName
                    : book.author
                }
                year={
                  props.isMeAuthor
                    ? book.books.publication_date.split(" ").pop()
                    : book.publication_date.split(" ").pop()
                }
                myown={props.isMeAuthor}
                handleRemove={props.handleRemove}
              />
            ) : null;
          }
        })
      )}
    </div>
  );
};
