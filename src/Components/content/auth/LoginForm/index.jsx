import { useState } from "react";
import LabeledInput from "../../../shared/labeledInput";
import Button from "../../../shared/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import shared from "../authForm.module.css";
import styles from "./login.module.css";

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form
      className={`${shared.authForm} ${styles.loginForm}`}
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
          const res = await axios.post("http://localhost:8000/api/v0.1/guest/login", { email, password });
          localStorage.setItem("token", res.data.payload.token);
          if (res.data.payload?.username) {
            localStorage.setItem("username", res.data.payload.username);
          }
          navigate("/profile");
        } catch (err) {
          setError(
            err.response?.data?.message || "Login failed. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className={shared.formHeader}>
        <h2>
          <span className={shared.highlight}>Welcome Back</span>,<br />
          Please Sign In Below
        </h2>
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
      {loading && <div style={{ marginTop: 8, color: "#00adb5", fontWeight: 500 }}>Loading...</div>}

      <div className={shared.formButton}>
        <Button text="Sign in" type="submit" disabled={loading} />
      </div>

      <p className={shared.signupLink}>
        Don’t Have an Account?{" "}
        <span className={shared.authToggle} onClick={toggle}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
