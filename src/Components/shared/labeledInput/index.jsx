import React from "react";
import styles from "./LabeledInput.module.css";

const LabeledInput = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className={styles.labeledInputContainer}>
    <label className={styles.labeledInputLabel}>{label}</label>
    <input
      className={styles.labeledInputField}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default LabeledInput;