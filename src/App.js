import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

import { Landing, Home, Profile, MyCollection } from "./pages";
import Book from "./pages/Book";
import AddBook from "./pages/AddBook";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import AddBookAdmin from "./pages/Admin/AddBook";

//if token exist
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, [dispatch]);

  console.log(state.user);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/my-collection" component={MyCollection} />
        <PrivateRoute path="/add-book" component={AddBook} />
        <PrivateRoute path="/book/:id" component={Book} />
        <AdminRoute path="/admin/add-book" component={AddBookAdmin} />
        <AdminRoute path="/admin" component={HomeAdmin} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

export default App;
