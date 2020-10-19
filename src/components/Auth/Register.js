import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../context/userContext";
import CustomTextInput from "../CustomTextInput";
import { API, setAuthToken } from "../../config/api";
import { MdErrorOutline } from "react-icons/md";

export const Register = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   fullName: "",
  //   address: "",
  //   phone: "",
  //   gender: "Male",
  // });
  // const { email, password, fullName, address, phone } = formData;

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      gender: "Male",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(8),
      fullName: Yup.string().required().min(3),
      gender: Yup.string().required(),
      phone: Yup.number().required().min(8),
      address: Yup.string().required().min(5),
    }),
    onSubmit: (values) => {
      //console.log(values);
      registerAction(values);
    },
  });

  console.log(state.isLogin);

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);

      try {
        const res = await API.post("/register", body, config);

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

        history.push("/dashboard");
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
        <CustomTextInput
          name="email"
          type="email"
          style={style.inputEmail}
          placeholder="Email"
          {...getFieldProps("email")}
          error={touched.email ? errors.email : ""}
        />
        <CustomTextInput
          name="password"
          type="password"
          style={style.inputPassword}
          placeholder="Password"
          {...getFieldProps("password")}
          error={touched.password ? errors.password : ""}
        />
        <CustomTextInput
          name="fullName"
          type="text"
          style={style.inputName}
          placeholder="Full Name"
          {...getFieldProps("fullName")}
          error={touched.fullName ? errors.fullName : ""}
        />
        <select
          className="form-control"
          name="gender"
          style={style.inputGender}
          {...getFieldProps("gender")}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <span className="help-block text-danger">
          {touched.gender ? errors.gender : ""}
        </span>
        <CustomTextInput
          name="phone"
          type="text"
          style={style.inputPhone}
          placeholder="Phone Number"
          {...getFieldProps("phone")}
          error={touched.phone ? errors.phone : ""}
        />
        <textarea
          className="form-control"
          name="address"
          style={style.inputAddress}
          placeholder="Address"
          {...getFieldProps("address")}
        />
        <span className="help-block text-danger">
          {touched.address ? errors.address : ""}
        </span>
        <button
          type="submit"
          className="btn btn-danger btn-block"
          style={{
            marginBottom: 20,
            marginTop: 20,
            backgroundColor: "#EE4622",
          }}
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
            <>Sign Up</>
          )}
        </button>
      </form>
      <h6 style={style.style_3}>
        Already have an account ? Klik{" "}
        <b style={{ cursor: "pointer" }} onClick={props.onClickLogin}>
          Here
        </b>
      </h6>
    </div>
  );
};

const style = {
  style_3: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: "25px",
    textAlign: "center",
  },
};
