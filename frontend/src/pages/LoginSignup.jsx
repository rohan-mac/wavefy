import React, { useState } from "react";
import "../LoginSignup.css";
// import { loginUser, registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { loginUser, SignupUser } from "../api";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [error, setError] = useState("");

  function redirect() {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;

      if (isLogin) {
        // 🔐 LOGIN
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // 🆕 SIGNUP
        response = await SignupUser(formData);
      }


      console.log("Auth Response:", response);
      if (response?.token) {
        // ✅ Save token
        localStorage.setItem("token", response.token);
        redirect();
        // 🚀 Go to home
        // navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">MyMusic 🎵</h1>

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {error && <p className="error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* 👤 Name only for Signup */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {!isLogin && (
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, profileImage: e.target.files[0] })
              }
            />

          )}

          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          {isLogin ? "New to MyMusic?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
