import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Navbar } from "../components/Navbar/";
import { Sidebar } from "../components/Sidebar";
import { ListBook } from "../components/ListBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/books");
      setBooks(res.data.data.books);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const {
    isLoading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery("getCategory", async () => await API.get("/categories"));

  const getByCategory = async (id, name) => {
    try {
      setLoading(true);
      const res = await API.get(`/category/${id}`);
      setBooks(res.data.data.category.books);
      setCategory(name);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mb-5 d-flex flex-column">
            <Sidebar />
          </div>
          <div className="col-md-9 mb-5">
            <div className="mb-3">
              <div
                className="card w-100 p-4"
                style={{ backgroundColor: "#E6F2FD" }}
              >
                <div className="row">
                  <div className="col-md-8 d-flex justify-content-center flex-column">
                    <h1 style={style.txtJudul}>
                      Share, read and <i>love</i>
                    </h1>
                    <h2 style={style.txtSub}>Reading is fascinating</h2>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center my-2">
                    <img
                      alt="book"
                      className="figure-img img-fluid rounded"
                      src={require("../assets/img/book1.png")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h1 style={style.txtList}>List Books</h1>
              <Dropdown drop="left">
                <Dropdown.Toggle
                  variant="danger"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "rgb(233,233,233,0.7)",
                    color: "#000000",
                    outline: "none",
                    border: 0,
                  }}
                >
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Button} onClick={() => getBooks()}>
                    All
                  </Dropdown.Item>
                  {categoryLoading || !categoryData ? (
                    <h1>Loading...</h1>
                  ) : categoryError ? (
                    <h1>error {categoryError.message} </h1>
                  ) : (
                    categoryData.data.data.categories.map((category, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          as={Button}
                          onClick={() => {
                            getByCategory(category.id, category.name);
                            //setCategory(category.id);
                          }}
                        >
                          {category.name}
                        </Dropdown.Item>
                      );
                    })
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="row justify-content-start">
              {loading ? (
                <h1>Loading...</h1>
              ) : books.toString() === "" ? (
                <div
                  className="alert alert-warning ml-auto mr-auto w-100 text-center"
                  role="alert"
                >
                  <h3>No Books Found in category {category}</h3>
                </div>
              ) : (
                books.map((book, index) => {
                  return book.status === "Approved" ? (
                    <ListBook
                      isactive
                      key={index}
                      index={book.id}
                      image={book.thumbnail}
                      title={book.title}
                      author={book.userId.fullName}
                    />
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const style = {
  txtJudul: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 70,
    lineHeight: "101.5%",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  txtSub: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    lineHeight: "101.5%",
    marginLeft: 30,
  },
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
  },
};

export default Home;
