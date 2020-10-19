import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

export const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "rgb(145, 121, 119, 30%)",
        width: "100%",
        height: "100vh",
      }}
    >
      <PuffLoader
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        }}
        size={60}
        color={"#16332D"}
        loading={true}
      />
    </div>
  );
};
