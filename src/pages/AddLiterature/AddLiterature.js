import React, { useState } from "react";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navbar, Wrapper } from "../../components";
import { CgAttachment } from "react-icons/cg";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import { BiBookAdd } from "react-icons/bi";
import { API } from "../../config/api";

export const AddLiterature = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const SUPPORTED_FORMATS_BOOK = ["application/pdf", "application/epub+zip"];

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      date: "",
      page: "",
      isbn: "",
      author: "",
      thumbnail: "",
      attache: "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().required().min(8),
      date: Yup.string().required().min(3),
      page: Yup.number().typeError().required().min(1),
      isbn: Yup.number().typeError().required().min(11),
      author: Yup.string().required().min(3),
      thumbnail: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept image filetype",
          (value) => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
        ),
      attache: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept epub/pdf filetype",
          (value) => value && SUPPORTED_FORMATS_BOOK.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
      addBook(values);
      resetForm({ values: "" });
    },
  });

  const [addBook] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      var formData = new FormData();
      formData.append("title", values.title);
      formData.append("publication_date", values.date);
      formData.append("pages", values.page);
      formData.append("author", values.author);
      formData.append("isbn", values.isbn);
      formData.append("thumbnail", values.thumbnail);
      formData.append("attache", values.attache);
      formData.append("status", "");

      const res = await API.post("/literature", formData, config);
      setMessage(res.data.message);
      setShow(true);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setShow(true);
    }
  });

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1 style={style.txtList} className="mb-4">
          Add Literature
        </h1>
        <form onSubmit={handleSubmit}>
          <CustomTextInput
            name="title"
            type="text"
            placeholder="Title"
            {...getFieldProps("title")}
            error={touched.title ? errors.title : ""}
          />
          <CustomTextInput
            name="date"
            type="date"
            placeholder="Publication Date"
            {...getFieldProps("date")}
            error={touched.date ? errors.date : ""}
          />
          <CustomTextInput
            name="page"
            type="text"
            placeholder="Pages"
            {...getFieldProps("page")}
            error={touched.page ? errors.page : ""}
          />
          <CustomTextInput
            name="isbn"
            type="text"
            placeholder="ISBN"
            {...getFieldProps("isbn")}
            error={touched.isbn ? errors.isbn : ""}
          />
          <CustomTextInput
            name="author"
            type="text"
            placeholder="Author"
            {...getFieldProps("author")}
            error={touched.author ? errors.author : ""}
          />
          <div className="form-group" style={{ marginTop: 20 }}>
            <label
              htmlFor="thumbnail"
              style={{
                display: "flex",
                alignItems: "center",
                width: 245,
                padding: 10,
                border: "2px solid #BCBCBC",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                color: "#ffffff",
              }}
            >
              <CgAttachment size={30} color="#ffffff" />{" "}
              {values.thumbnail.name
                ? values.thumbnail.name
                : "Attache Literature Image"}
            </label>
            <input
              type="file"
              className="form-control-file"
              id="thumbnail"
              name="thumbnail"
              style={{ display: "none" }}
              //onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("thumbnail", e.target.files[0]);
              }}
            />
            <span className="help-block text-danger">
              {touched.thumbnail ? errors.thumbnail : ""}
            </span>
          </div>

          <div className="form-group" style={{ marginTop: 20 }}>
            <label
              htmlFor="file"
              style={{
                display: "flex",
                alignItems: "center",
                width: 218,
                padding: 10,
                border: "2px solid #BCBCBC",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                color: "#ffffff",
              }}
            >
              <CgAttachment size={30} color="#ffffff" />{" "}
              {values.attache.name
                ? values.attache.name
                : "Attache Literature File"}
            </label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              name="attache"
              style={{ display: "none" }}
              onChange={(e) => {
                setFieldValue("attache", e.target.files[0]);
              }}
            />
            <span className="help-block text-danger">
              {touched.attache ? errors.attache : ""}
            </span>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary mx-2"
              style={{ backgroundColor: "#EE4622" }}
            >
              Add Book <BiBookAdd />
            </button>
          </div>
        </form>
      </Wrapper>
      <CustomModal show={show} onHide={() => setShow(false)}>
        <h5 style={style.popup}>
          {message} <br />
          Thank you for adding your own literature to our website, please wait 1
          x 24 hours to verify
        </h5>
      </CustomModal>
    </>
  );
};

const style = {
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 34,
    color: "#ffffff",
  },
  popup: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    color: "#ffffff",
    margin: 0,
    textAlign: "center",
  },
};
