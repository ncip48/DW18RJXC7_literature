import React, { useContext, useState } from "react";
import { Navbar, Wrapper, CardProfile, CardBook } from "../../components/";
import CustomModal from "../../components/CustomModal";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { EditPhotoProfile } from "./EditPhotoProfile";

//const URI = "http://localhost:5000/src/uploads/img/";

export const Profile = () => {
  const [state] = useContext(UserContext);
  const [showEditPP, setShowEditPP] = useState(false);

  const {
    isLoading: loadingProfile,
    data: profileDetails,
    refetch,
  } = useQuery("getUserDetail", () => API.get(`/profile/${state.user.id}`));

  const { isLoading, data: booksProfile } = useQuery("getUserBooks", () =>
    API.get(`/profile/${state.user.id}/literature`)
  );

  console.log(booksProfile);

  return (
    <>
      <Navbar />
      <Wrapper>
        <CardProfile
          loading={loadingProfile}
          data={profileDetails}
          // email={profileDetails}
          // gender={state.user.gender}
          // phone={state.user.phone}
          // address={state.user.address}
          // photo={state.user.photoProfile}
          handleEdit={() => setShowEditPP(true)}
        />
        <div className="d-flex justify-content-between">
          <h1 style={style.txtList}>My Literature</h1>
        </div>
        <CardBook
          loading={isLoading}
          dataBook={booksProfile?.data?.data?.literature}
        />
      </Wrapper>
      <CustomModal
        title="Edit Photo Profile"
        width={700}
        show={showEditPP}
        onHide={() => setShowEditPP(false)}
      >
        <EditPhotoProfile refetch={() => refetch()} />
      </CustomModal>
    </>
  );
};

const style = {
  txtList: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    color: "#ffffff",
    fontSize: 36,
    marginTop: 40,
    marginBottom: 10,
    fontWeight: "bold",
  },
};
