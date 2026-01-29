// import React, { useEffect, useState } from "react";
// import { fetchUserProfile, updateUserProfile } from "../api";
// import "../Users.css";
// import Loader from "../Components/Loader";

// const Users = () => {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getProfile = async () => {
//       const data = await fetchUserProfile();

//       if (data?.error) {
//         console.error("Error fetching user profile:", data.error);
//       } else {
//         setUserData(data);
//       }

//       setLoading(false);
//     };

//     getProfile();

//     // Implementation for updating user role
//   }, []);

//   if (loading) return <Loader />;
//   if (!userData || userData.length === 0) return <h2>No users found</h2>;

//   return (
//     <div className="users-container">
//       {/* <h2>User Profiles</h2> */}
//       <ul className="user-list">
//         {userData.map((user) => (
//           <li key={user._id} className="user-card">
//             <div className="userProfile">
//               <img
//                 src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                 alt={`${user.name} profile`}
//                 className="profile-img"
//               />
//             </div>
//             <div className="user-info">
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Role:</strong> {user.role}</p>
//             </div>
//             <div className="change-role-btn">
//               <button onClick={() => updateRole(user._id, "admin")}>Change Role</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import { deleteUserAccount, fetchUserProfile, updateUserRoleByAdmin } from "../api";
import "../Users.css";
import Loader from "../Components/Loader";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  /* ✅ FIX: function OUTSIDE useEffect */
  const updateRole = async (userId, newRole) => {
    try {
      console.log("Updating role for user:", userId, "to", newRole);
      setUpdatingId(userId);

      await updateUserRoleByAdmin({ id: userId, role: newRole });

    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (userId) => {
    await deleteUserAccount(userId);
  }

  if (loading) return <Loader />;
  if (!userData.length) return <h2>No users found</h2>;

  return (
    <div className="users-container">
      <ul className="user-list">
        {userData.map((user) => (
          <li key={user._id} className="user-card">
            <div className="userProfile">
              <img
                src={
                  user.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={user.name}
                className="profile-img"
              />
              <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>



            <div className="change-role-btn">
              {user.role !== "admin" ? (
                <>
                  <button
                    className={`admin-btn ${updatingId === user._id ? "loading" : ""}`}
                    disabled={updatingId === user._id}
                    onClick={() => {
                      console.log("Make Admin clicked for user:", user._id);
                      updateRole(user._id, "admin");
                    }}
                  >
                    {updatingId === user._id ? "Updating..." : "Make Admin"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Delete this user permanently?")) {
                        deleteUser(user._id);
                        setUserData(prev => prev.filter(u => u._id !== user._id));
                      }
                    }}
                  >
                    Delete
                  </button>

                </>



              ) : (
                <span
                  className={`admin-btn ${updatingId === user._id ? "loading" : ""}`}

                >Admin</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

