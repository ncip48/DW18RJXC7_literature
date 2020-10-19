import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Jumbotron, Login, Register } from "../../components";
import CustomModal from "../../components/CustomModal";
import { UserContext } from "../../context/userContext";

export const Landing = () => {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state] = useContext(UserContext);

  useEffect(() => {
    state.user
      ? state.user.role === 1
        ? history.push("/admin")
        : history.push("/dashboard")
      : history.push("/");
  }, [history, state.user]);

  return (
    <>
      <Navbar />
      <Jumbotron
        register={() => setShowRegister(true)}
        login={() => setShowLogin(true)}
      />
      <CustomModal
        title="Register"
        width={416}
        show={showRegister}
        onHide={() => setShowRegister(false)}
      >
        <Register
          showLogin={showLogin}
          onClickLogin={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
        />
      </CustomModal>
      <CustomModal
        title="Login"
        width={416}
        show={showLogin}
        onHide={() => setShowLogin(false)}
      >
        <Login
          showRegister={showRegister}
          onCliCkRegister={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
        />
      </CustomModal>
    </>
  );
};
