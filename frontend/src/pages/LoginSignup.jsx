import React, { useState } from "react";
import "../style/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { loginUser, SignupUser } from "../api";
import logo from "../assets/image.png";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({ ...formData, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFormData({ ...formData, profileImage: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await SignupUser(formData);
      }

      if (response?.token) {
        localStorage.setItem("wavefytoken", response.token);
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {error && <p className="error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>

   {/* 🔥 Modern Profile Upload */}
              <div className="upload-wrapper">
                <label className="upload-box">
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" />
                      <div className="overlay">Change Photo</div>
                    </>
                  ) : (
                    <div className="upload-placeholder">
                      {/* <span>📷</span> */}
                      <p>Upload Profile</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>

                {preview && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={removeImage}
                  >
                    Remove
                  </button>
                )}
              </div>


              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

           
            </>
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

          <button type="submit">
            {loading ? (
              <div className="loading">
                <span className="loginloader"></span>
              </div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="auth-footer">
          {isLogin ? "New to Wavefy?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
