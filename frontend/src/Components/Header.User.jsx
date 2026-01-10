import React from "react";
import Signup from "../pages/Signup";
import { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function User({ user }) {
  const username = user.name[0].toUpperCase() + user.name.slice(1);

  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className="user-profile" >
      <img

        src={user.profileImage}
        alt="User"
        className="user-avatar"
        onClick={handleClick}
      />
      <div className="user-info">
        <span className="user-name">{username}</span>
        {/* <span className="user-role">{user.role }</span> */}
      </div>

      {open && (
        <div className="user-box" ref={boxRef}>
          <form action="submit">

            <div>
              {/* <img src="https://img.icons8.com/?size=100&id=64042&format=png&color=000000" alt="logoutIcon" width="16px" height="16px" /> */}
              {/* <button class="logout-button">
                <span>🚪</span> Logout
              </button> */}


              {/* <ul></ul> */}

              {/* add more things in this nav */}
              <nav className="sidebar-menu">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `menu-item ${isActive ? "active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </nav>
            </div>
          </form>
        </div >
      )
      }
    </div >
  );
}

export default User;
