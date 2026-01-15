import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api";
import "../Users.css";
const Users = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            const data = await fetchUserProfile();

            if (data?.error) {
                console.log("Error fetching user profile:", data.error);
            } else {
                console.log("User profile data:", data);
                setUserData(data);
            }

            setLoading(false);
        };

        getProfile();
    }, []); // ✅ RUN ONLY ONCE
    console.log("User Data:", userData);
    if (loading) return <h2>Loading...</h2>;
    if (!userData) return <h2>No user found</h2>;

    return (
        <div>
            <h2>User Profile</h2>

            <div>
                <h3>All Users:</h3>
                <ul>
                    {userData.length > 0 ? (
                        userData.map((user) => (
                            <li key={user._id}>

                                <div className="userProfile">
                                    <img src={user.profileImage} alt="profile pic" width="50px" height="50px" /><br />

                                </div>
                                <div>
                                    Name: {user.name} <br />
                                    Email: {user.email} <br />
                                </div>
                                <div>
                                    Role: {user.role} <br />

                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Users;
