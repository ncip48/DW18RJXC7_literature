import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import { BiBookAdd, BiLogOut } from "react-icons/bi";
import { UserContext } from "../../context/userContext";
import { urlAsset } from "../../config/api";
import "./style.css";

export const Navbar = () => {
  const pathname = window.location.pathname.split("/")[1];
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();
  function logout() {
    dispatch({
      type: "LOGOUT",
    });
    console.log(state);
    //localStorage.clear();
    history.push("/");
  }

  return pathname === "" ? (
    <nav className="navbar navbar-dark fixed-top nav-top">
      <img src={require("../../assets/img/icon.png")} className="logo" alt="" />
    </nav>
  ) : (
    <nav className="navbar navbar-dark nav-profile navbar navbar-expand-lg">
      <div className="container">
        <div className="col-md-6 w-100">
          {pathname === "admin" ? (
            <Link to={pathname === "admin" ? "/admin" : "/dashboard"}>
              <img
                src={require("../../assets/img/icon.png")}
                className="logo"
                alt=""
              />
            </Link>
          ) : (
            <>
              <ul className="navbar-nav">
                <li
                  className={
                    pathname === "profile" ? "nav-item active" : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li
                  className={
                    pathname === "my-collection"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/my-collection">
                    My Collection
                  </Link>
                </li>
                <li
                  className={
                    pathname === "add-literature"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/add-literature">
                    Add Literature
                  </Link>
                </li>
                <li className="nav-item">
                  {state.isLogin ? (
                    <a
                      className="nav-link"
                      href="#logout"
                      onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                        })
                      }
                    >
                      Logout
                    </a>
                  ) : null}
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          {pathname === "admin" ? (
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                <img
                  src={
                    state.user.photoProfile === null
                      ? require("../../assets/img/blank.png")
                      : urlAsset.img + state.user.photoProfile
                  }
                  style={{
                    height: 50,
                    width: 50,
                    border: "5px solid #C4C4C4",
                    boxSizing: "border-box",
                    borderRadius: 25,
                  }}
                  alt=""
                />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight style={{ backgroundColor: "red" }}>
                <Dropdown.Item
                  as={Link}
                  to="/admin/add-book"
                  style={{
                    marginBottom: ".5rem",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BiBookAdd size={22} style={{ marginRight: 10 }} /> Add Book
                </Dropdown.Item>
                <hr style={{ margin: 0 }} />
                <Dropdown.Item
                  as={Button}
                  onClick={() => logout()}
                  style={{
                    marginTop: ".5rem",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BiLogOut size={22} style={{ marginRight: 10 }} /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to={pathname === "admin" ? "/admin" : "/dashboard"}>
              <img
                src={require("../../assets/img/icon.png")}
                className="logo"
                alt=""
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
