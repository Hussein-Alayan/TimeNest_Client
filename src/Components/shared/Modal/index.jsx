import React from "react";
import styles from "./Modal.module.css";
import Button from "../button";

const Modal = ({ children, onClose }) => (
  <div className={styles.overlay}>
    <div className={styles.modalContent}>
      <Button className={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</Button>
      {children}
    </div>
  </div>
);

export default Modal; 