import React, { useEffect, useState } from "react";
import { deleteUserAccount, fetchUserProfile, updateUserRoleByAdmin } from "../api";
import "../style/Users.css";
import Loader from "../Components/Loader";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [roleFilter, setRoleFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");



  const filterByRole = (users) => {
    if (roleFilter === "all") return users;
    return users.filter(user => user.role === roleFilter);
  };



  const sortByDate = (users) => {
    return [...users].sort((a, b) => {
      if (dateSort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };



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



  const getProcessedUsers = () => {
    const filtered = filterByRole(userData);
    return sortByDate(filtered);
  };





  if (loading) return <Loader />;
  if (!userData.length) return <h2>No users found</h2>;

  return (
    <div className="users-container">

      <div className="users-filters">
        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        {/* Date Sort */}
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <ul className="user-list">
        {getProcessedUsers().map((user) => (
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

