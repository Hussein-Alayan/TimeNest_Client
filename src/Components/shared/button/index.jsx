import React from "react";
import styles from './Button.module.css';

const Button = ({ text, children, onClick, type = "button", className = "", variant = "primary", ...props }) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant] || ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;