// import React, { useState } from "react";
// import "../style/LoginSignup.css";
// import { useNavigate } from "react-router-dom";
// import { loginUser, SignupUser, sendOtp, verifyOtp } from "../api";
// import logo from "../assets/image.png";

// function LoginSignup() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [preview, setPreview] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profileImage: null,
//   });

//   const [error, setError] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setFormData({ ...formData, profileImage: file });

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setPreview(null);
//     setFormData({ ...formData, profileImage: null });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       let response;

//       if (isLogin) {
//         response = await loginUser({
//           email: formData.email,
//           password: formData.password,
//         });
//       } else {
//         const verifyOtpResponse = await verifyOtp(formData.email, formData.otp);
//         console.log(verifyOtpResponse);

//         if (!verifyOtpResponse) {
//           throw new Error(verifyOtpResponse,"OTP verification failed");
//           return
//         }
//         response = await SignupUser(formData);
//       }

//       if (response?.token) {
//         localStorage.setItem("wavefytoken", response.token);
//         navigate("/");
//         window.location.reload();
//       } else {
//         setError("Invalid credentials");
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };



//   return (
//     <div className="page-wrapper">
//       <div className="form-card">

//         <div className="brand-logo">
//           🎵 Wavefy
//         </div>

//         {error && <p className="form-error">{error}</p>}

//         <form className="form-body" onSubmit={handleSubmit}>

//           {!isLogin && (
//             <>
//               <div className="avatar-upload">
//                 <label className="avatar-box">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="Preview" />
//                       <div className="avatar-overlay">Change</div>
//                     </>
//                   ) : (
//                     <div className="avatar-placeholder">
//                       Upload Profile
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     hidden
//                   />
//                 </label>

//                 {preview && (
//                   <button
//                     type="button"
//                     className="avatar-remove"
//                     onClick={removeImage}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>

//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </>
//           )}

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             required
//           />

//           {!isLogin && (
//             <div className="otp-row">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 maxLength={6}
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button type="button" className="otp-button"
//                 onClick={() => sendOtp(formData.email)}

//               >
//                 Send OTP
//               </button>
//             </div>
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             required
//           />

//           <button type="submit" className="primary-btn">
//             {loading ? (
//               <div className="btn-loading">
//                 <span className="spinner"></span>
//               </div>
//             ) : isLogin ? (
//               "Login"
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         <p className="form-footer">
//           {isLogin ? "New to Wavefy?" : "Already have an account?"}
//           <span onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? " Sign up" : " Login"}
//           </span>
//         </p>

//       </div>
//     </div>
//   );



//   return (
//     <div className="page-wrapper">
//       <div className="form-card">

//         <div className="brand-logo">
//           🎵 Wavefy
//         </div>

//         {error && <p className="form-error">{error}</p>}

//         <form className="form-body" onSubmit={handleSubmit}>

//           {!isLogin && (
//             <>
//               <div className="avatar-upload">
//                 <label className="avatar-box">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="Preview" />
//                       <div className="avatar-overlay">Change</div>
//                     </>
//                   ) : (
//                     <div className="avatar-placeholder">
//                       Upload Profile
//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     hidden
//                   />
//                 </label>

//                 {preview && (
//                   <button
//                     type="button"
//                     className="avatar-remove"
//                     onClick={removeImage}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>

//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </>
//           )}

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             required
//           />

//           {!isLogin && (
//             <div className="otp-row">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 maxLength={6}
//                 required
//               />
//               <button type="button" className="otp-button">
//                 Send OTP
//               </button>
//             </div>
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             required
//           />

//           <button type="submit" className="primary-btn">
//             {loading ? (
//               <div className="btn-loading">
//                 <span className="spinner"></span>
//               </div>
//             ) : isLogin ? (
//               "Login"
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         <p className="form-footer">
//           {isLogin ? "New to Wavefy?" : "Already have an account?"}
//           <span onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? " Sign up" : " Login"}
//           </span>
//         </p>

//       </div>
//     </div>
//   );




//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>{isLogin ? "Login" : "Create Account"}</h2>

//         {error && <p className="error">{error}</p>}

//         <form className="auth-form" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>

//               {/* 🔥 Modern Profile Upload */}
//               <div className="upload-wrapper">
//                 <label className="upload-box">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="Preview" />
//                       <div className="overlay">Change Photo</div>
//                     </>
//                   ) : (
//                     <div className="upload-placeholder">
//                       {/* <span>📷</span> */}
//                       <p>Upload Profile</p>
//                     </div>
//                   )}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     hidden
//                   />
//                 </label>

//                 {preview && (
//                   <button
//                     type="button"
//                     className="remove-btn"
//                     onClick={removeImage}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>


//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />


//             </>
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             required
//           />

//           {!isLogin && (
//             <div className="otp-section">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//                 style={{ marginBottom: "0px" }}
//                 className="otp-section-input"
//               />

//               <button
//                 type="button"
//                 className="otp-btn"
//               >
//                 Send OTP
//               </button>
//             </div>

//           )

//           }




//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             required
//           />

//           <button type="submit">
//             {loading ? (
//               <div className="loading">
//                 <span className="loginloader"></span>
//               </div>
//             ) : isLogin ? (
//               "Login"
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>

//         <p className="auth-footer">
//           {isLogin ? "New to Wavefy?" : "Already have an account?"}
//           <span onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? " Sign up" : " Login"}
//           </span>
//         </p>
//       </div>
//     </div >
//   );
// }

// export default LoginSignup;

import React, { useState } from "react";
import "../style/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { loginUser, SignupUser, sendOtp, verifyOtp } from "../api";

function LoginSignup() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({ ...formData, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFormData({ ...formData, profileImage: null });
  };

  // ================= OTP SEND =================
  const handleSendOtp = async () => {
    setError("");
    setSuccessMessage("");

    if (!formData.email) {
      setError("Please enter email first");
      return;
    }

    try {
      const res = await sendOtp(formData.email);

      if (!res || res.error) {
        throw new Error(res?.error || "Failed to send OTP");
      }

      setSuccessMessage("OTP sent successfully. Check your email.");
      setOtpCooldown(30);

      const timer = setInterval(() => {
        setOtpCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setError(err.message);
    }
  };

  // ================= FORM SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (!otp) {
          throw new Error("Please enter OTP");
        }

        const verifyResponse = await verifyOtp(formData.email, otp);

        if (!verifyResponse || verifyResponse.error) {
          throw new Error(verifyResponse?.error || "Invalid OTP");
        }

        response = await SignupUser(formData);
      }

      if (response?.token) {
        navigate("/");
        window.location.reload();
      } else {
        throw new Error("Authentication failed");
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= JSX =================
  return (
    <div className="page-wrapper">
      <div className="form-card">

        <div className="brand-logo">🎵 Wavefy</div>

        {error && <p className="form-error">{error}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}

        <form className="form-body" onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              {/* PROFILE IMAGE */}
              <div className="avatar-upload">
                <label className="avatar-box">
                  {preview ? (
                    <>
                      <img src={preview} alt="Preview" />
                      <div className="avatar-overlay">Change</div>
                    </>
                  ) : (
                    <div className="avatar-placeholder">
                      Upload Profile
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
                    className="avatar-remove"
                    onClick={removeImage}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* NAME */}
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

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          {/* OTP SECTION */}
          {!isLogin && (
            <div className="otp-row">
              <input
                type="text"
                placeholder="Enter OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                type="button"
                className="otp-button"
                onClick={handleSendOtp}
                disabled={otpCooldown > 0}
              >
                {otpCooldown > 0
                  ? `Resend in ${otpCooldown}s`
                  : "Send OTP"}
              </button>
            </div>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          {/* SUBMIT BUTTON */}
          <button type="submit" className="primary-btn">
            {loading
              ? "Processing..."
              : isLogin
                ? "Login"
                : "Create Account"}
          </button>

        </form>

        <p className="form-footer">
          {isLogin
            ? "New to Wavefy?"
            : "Already have an account?"}
          <span onClick={() => {
           
            setIsLogin(!isLogin)
          }
          }>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginSignup;
