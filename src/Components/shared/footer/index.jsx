import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className={styles.homeFooter}>
    <div className={styles.footerContent}>
      <div className={styles.footerLogo}>TimeNest</div>
      <nav className={styles.footerNav}>
        <Link to="/">Home</Link>
        <Link to="/wall">Wall</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <div className={styles.footerCopy}>
        © 2025 TimeCapsule • Made with <span role="img" aria-label="love">💙</span> by Hussein Alayan
      </div>
    </div>
  </footer>
);

export default Footer; 