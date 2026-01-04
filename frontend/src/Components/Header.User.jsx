import React from "react";

function User() {
  return (
    <div className="user-profile">
      <img
        src="src/assets/react.svg"
        alt="User"
        className="user-avatar"
      />
      <div className="user-info">
        <span className="user-name">Rohan</span>
        <span className="user-role">Listener</span>
      </div>
    </div>
  );
}

export default User;
