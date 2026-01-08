import React, { useState } from "react";
import "../LoginSignup.css";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form with data:", formData);
    const response = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    if (response?.token) {
      // onLoginSuccess();     // update App state
      navigate("/");
      // 🚀 navigate to home
    } else {
      console.log("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">MyMusic 🎵</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New to MyMusic?
          <span onClick={() => setIsLogin(false)}> Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
