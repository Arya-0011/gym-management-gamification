import React from "react";
import { Button } from "@mantine/core";

const Modal = ({ title, visible, onClose, children }) => {
    return (
        <div style={{ display: visible ? "block" : "none" }}>
            <div style={modalBackdropStyle} onClick={onClose}></div>
            <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                    <h2>{title}</h2>
                    <Button variant="light" onClick={onClose}>Close</Button>
                </div>
                <div style={modalBodyStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const modalBackdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
};

const modalContentStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "4px",
    zIndex: 10000,
};

const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
};

const modalBodyStyle = {
    marginBottom: "20px",
};

export default Modal;
