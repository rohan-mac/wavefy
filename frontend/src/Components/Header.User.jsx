import React from "react";

function User({ user }) {
  console.log(user);
  const username = user.name[0].toUpperCase() + user.name.slice(1);
  return (
    <div className="user-profile">
      <img
        src={user.profileImage}
        alt="User"
        className="user-avatar"
      />
      <div className="user-info">
        <span className="user-name">{username}</span>
        {/* <span className="user-role">{user.role }</span> */}
      </div>
    </div>
  );
}

export default User;
