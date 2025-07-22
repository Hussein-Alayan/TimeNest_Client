import React, { useState } from "react";
import "./style.css";
import LoginForm from "../../Components/content/auth/LoginForm";
import SignUpForm from "../../Components/content/auth/SignUpForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {isLogin ? (
          <LoginForm toggle={switchForm} />
        ) : (
          <SignUpForm toggle={switchForm} />
        )}
      </div>
    </div>
  );
};

export default Auth; 