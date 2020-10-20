import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { UserContext } from "../../context/userContext";
import { TextInput } from "../Form";
import { MdErrorOutline } from "react-icons/md";
import { API, setAuthToken } from "../../config/api";

export const Login = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  console.log(state.isLogin);

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      loginAction(values);
    },
  });

  const [loginAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = values;

        const res = await API.post("/login", body, config);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        setAuthToken(res.data.data.token);

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

        res.data.data.role === 1
          ? history.push("/admin")
          : history.push("/dashboard");
      } catch (err) {
        dispatch({
          type: "LOGIN_FAILED",
        });
        setErrorMsg(err.response.data.error.message);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
    }
  });

  return (
    <div>
      {errorMsg ? (
        <div
          className="alert alert-dark"
          role="alert"
          style={{ marginTop: 20 }}
        >
          <MdErrorOutline size={30} /> {errorMsg || error}
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <TextInput
          name="email"
          type="email"
          placeholder="Email"
          {...getFieldProps("email")}
          error={touched.email ? errors.email : ""}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          {...getFieldProps("password")}
          error={touched.password ? errors.password : ""}
        />
        <button
          type="submit"
          className="btn btn-danger btn-block"
          style={{ marginBottom: 20, backgroundColor: "#AF2E1C" }}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            <>Log In</>
          )}
        </button>
      </form>
      <h6 style={style.textBottom}>
        Don't have an account ? Klik{" "}
        <b
          style={{ cursor: "pointer", color: "#AF2E1C" }}
          onClick={props.onCliCkRegister}
        >
          Here
        </b>
      </h6>
    </div>
  );
};

const style = {
  inputEmail: {
    marginTop: 20,
    marginBottom: 20,
  },
  inputPassword: {
    marginBottom: 20,
  },
  textBottom: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: "25px",
    margin: 0,
    textAlign: "center",
  },
};
