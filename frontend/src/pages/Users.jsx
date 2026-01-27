import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api";
import "../Users.css";
import Loader from "../Components/Loader";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchUserProfile();

      if (data?.error) {
        console.error("Error fetching user profile:", data.error);
      } else {
        setUserData(data);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  if (loading) return <Loader />;
  if (!userData || userData.length === 0) return <h2>No users found</h2>;

  return (
    <div className="users-container">
      {/* <h2>User Profiles</h2> */}
      <ul className="user-list">
        {userData.map((user) => (
          <li key={user._id} className="user-card">
            <div className="userProfile">
              <img
                src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={`${user.name} profile`}
                className="profile-img"
              />
            </div>
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
