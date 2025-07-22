import { useState } from "react";
import LabeledInput from "../../../shared/labeledInput";
import Button from "../../../shared/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import shared from "../authForm.module.css";
import styles from "./signup.module.css";

const SignUpForm = ({ toggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className={`${shared.authForm} ${styles.signupForm}`}
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        try {
          const res = await axios.post("http://localhost:8000/api/v0.1/guest/register", {
            username,
            email,
            password,
          });
          localStorage.setItem("token", res.data.token);
          if (res.data.payload?.username) {
            localStorage.setItem("username", res.data.payload.username);
          }
          navigate("/profile");
        } catch (err) {
          const backendMsg = err.response?.data?.message || "Registration failed. Please try again.";
          // Check for duplicate username error
          if (backendMsg.includes("Duplicate entry") && backendMsg.includes("users_username_unique")) {
            setError("This username is already taken. Please choose another.");
          } else {
            setError(backendMsg);
          }
        }
      }}
    >
      <div className={shared.formHeader}>
        <h2>
          <span className={shared.highlight}>Create Account</span>
        </h2>
      </div>
      <div className={shared.formGroup}>
        <LabeledInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={shared.formGroup}>
        <LabeledInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={shared.formGroup}>
        <LabeledInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div className={shared.formButton}>
        <Button text="Sign up" type="submit" />
      </div>
      <p className={shared.loginLink}>
        Already have an account?{" "}
        <span className={shared.authToggle} onClick={toggle}>
          Login
        </span>
      </p>
    </form>
  );
};

export default SignUpForm; 