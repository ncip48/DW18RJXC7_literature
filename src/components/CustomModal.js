import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  return (
    <Modal
      {...props}
      //size="lg"
      centered
      style={{
        padding: 0,
        width: props.width,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal.Body
        style={{ padding: 30, backgroundColor: "#161616", color: "#ffffff" }}
      >
        <h1 style={{ margin: 0 }}>{props.title}</h1>
        {props.children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
