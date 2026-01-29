// import React, { useState } from "react";
// import "../Settings.css";
// import { updateUserProfile } from "../api";

// const Settings = ({ user }) => {
//     const [name, setName] = useState(user?.name || "");
//     const [password, setPassword] = useState("");
//     const [theme, setTheme] = useState(user?.preferences?.theme || "light");
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();
//             formData.append("name", name);

//             if (password) formData.append("password", password);

//             // Must be parsed as JSON in backend
//             formData.append("preferences", JSON.stringify({ theme }));

//             // MUST match upload.single("image") on backend
//             if (image) formData.append("image", image);

//             // Debug: confirm FormData is filled
//             for (let [key, value] of formData.entries()) {
//                 console.log(key, value);
//             }

//             const res = await updateUserProfile(formData);

//             if (res.error) {
//                 setMessage("❌ Failed to update profile");
//             } else {
//                 setMessage("✅ Profile updated successfully");
//                 setPassword("");
//             }
//         } catch (err) {
//             console.error(err);
//             setMessage("❌ Failed to update profile");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="setting-main-container">
//             <div className="setting-wrapper">
//                 <h2>Account Settings</h2>

//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />

//                     <label>New Password</label>
//                     <input
//                         type="password"
//                         placeholder="Leave empty to keep current"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                     <label>Theme</label>
//                     <select value={theme} onChange={(e) => setTheme(e.target.value)}>
//                         <option value="light">Light</option>
//                         <option value="dark">Dark</option>
//                     </select>

//                     <label>Profile Image</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setImage(e.target.files[0])}
//                     />

//                     {message && <p className="status-message">{message}</p>}

//                     <button type="submit" disabled={loading}>
//                         {loading ? "Updating..." : "Save Changes"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import "../Settings.css";
import { updateUserProfile } from "../api";

const Settings = ({ user }) => {
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState("");
    const [theme, setTheme] = useState(user?.preferences?.theme || "light");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.profileImage || "/default-avatar.png");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");



    console.log(user);
    // Image preview effect
    useEffect(() => {
        if (!image) {
            setPreview(user?.profileImage || "/default-avatar.png");
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image, user?.profileImage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("name", name);
            if (password) formData.append("password", password);
            formData.append("preferences", JSON.stringify({ theme }));
            if (image) formData.append("image", image);


            const res = await updateUserProfile(formData);
            // console.log("Updating name to:", "🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️");

            console.log("Response from updateUserProfile:", res);
            if (res.error) {
                setMessage("❌ Failed to updatddmfldlfme profile");
            } else {
                setMessage("✅ Profile updatamed successfully");
                setPassword("");
            }

        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="setting-main-container">
            <div className="setting-wrapper">
                {/* <h2>Edit Profile</h2> */}

                {/* Image preview */}
                <div className="profile-image-preview">
                    <div className="preview-image">
                        <label htmlFor="file-upload" className="change-photo-label">
                            {/* Change profile photo */}
                            <img src={preview || user.profileImage} alt="Profile" className="profile-image" width="100%" height="100%" />
                        </label>

                    </div>
                    {/* <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    /> */}

                    {/* Hidden Input */}
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }} // This hides the "No file chosen" text
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {/* Styled text link to trigger the same input */}

                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="disabled-input"
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        placeholder="Leave empty to keep current"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Theme</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>

                    {message && <p className="status-message">{message}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
