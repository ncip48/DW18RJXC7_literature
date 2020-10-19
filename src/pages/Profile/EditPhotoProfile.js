import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

export const EditPhotoProfile = () => {
  const [state, dispatch] = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [success, setSuccess] = useState("");

  const [updatePP] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("photoProfile", image, image.name);

      const res = await API.patch("/edit_photo", formData, config);
      setSuccess(res.data.message);
      dispatch({
        type: "UPDATE_PP_SUCCESS",
        payload: res.data.data.user,
      });
    } catch (err) {
      console.log(err.message);
    }
  });

  console.log(state.isLogin);

  const fileData = () => {
    if (image)
      return (
        <h5>
          {" "}
          <em> {image.name} </em>{" "}
        </h5>
      );

    return null;
  };

  return (
    <div>
      <div className="row">
        <div className="col-8 d-flex justify-content-center flex-column">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePP();
            }}
          >
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    const objectUrl = URL.createObjectURL(e.target.files[0]);
                    setPreview(objectUrl);
                  }}
                  className="custom-file-input"
                  id="image"
                />

                <label className="custom-file-label" htmlFor="image">
                  {image ? fileData() : "Choose File"}
                </label>
              </div>
            </div>
            <button
              className="btn btn-no"
              type="submit"
              style={{ backgroundColor: "#EE4622", color: "#ffffff" }}
            >
              Submit
            </button>
          </form>
          <small>{success}</small>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center flex-column">
          <small id="passwordHelp" className="text-danger">
            Preview
          </small>
          <img height="100" width="100" src={preview} alt="" />
        </div>
      </div>
    </div>
  );
};
