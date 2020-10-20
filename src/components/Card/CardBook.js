import React from "react";
import { ListBook } from "../ListBook";

export const CardBook = (props) => {
  return (
    <div className="row">
      {props.loading ? (
        <h1>Loading...</h1>
      ) : props.dataBook.toString() === "" ? (
        <div
          className="alert alert-warning ml-auto mr-auto w-100 text-center"
          role="alert"
        >
          <h3>No Books Found</h3>
        </div>
      ) : (
        props.dataBook.map((book, index) => {
          return book.status !== "Canceled" ? (
            book.books?.status !== "Canceled" ? (
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
                year={"2020"}
                myown={props.isMeAuthor}
              />
            ) : null
          ) : null;
        })
      )}
    </div>
  );
};
