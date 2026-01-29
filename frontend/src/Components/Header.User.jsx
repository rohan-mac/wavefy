// import React, { useEffect } from "react";
// import Signup from "../pages/Signup";
// import { useRef } from "react";
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { logoutUser } from "../api";

// function User({ user }) {
//   const username = user.name[0].toUpperCase() + user.name.slice(1);

//   const [open, setOpen] = useState(false);
//   const boxRef = useRef(null);

//   function handleClick() {
//     setOpen(!open);
//   }

//   useEffect(() => {
//     async function handleLogout() {
//       const result = await logoutUser();
//       // Implement logout functionality here
//       window.location.reload();
//     }
//   }, []);




//   return (
//     <div className="user-profile" >
//       <img

//         src={user.profileImage}
//         alt="User"
//         className="user-avatar"
//         onClick={handleClick}
//       />
//       <div className="user-info">
//         <span className="user-name">{username}</span>
//         {/* <span className="user-role">{user.role }</span> */}
//       </div>

//       {open && (
//         <div className="user-box" ref={boxRef}>
//           {/* <form action="submit"> */}

//           <div>

//             <nav className="sidebar-menu">
//               <NavLink
//                 to="/settings"
//                 end
//                 className={({ isActive }) =>
//                   `menu-item ${isActive ? "active" : ""}`
//                 }
//               >
//                 Setting
//               </NavLink>
//             </nav>

//             <span onClick={handleLogout}>LogOut</span>
//           </div>
//           {/* </form> */}
//         </div >
//       )
//       }
//     </div >
//   );
// }

// export default User;

import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../api";

function User({ user }) {
  console.log(user);

  const username = user.name[0].toUpperCase() + user.name.slice(1);

  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  function handleClick() {
    setOpen(!open);
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <div className="user-profile">
      <img
        src={user.profileImage}
        alt="User"
        className="user-avatar"
        onClick={handleClick}
      />

      <div className="user-info">
        <span className="user-name">{username}</span>
      </div>

      {open && (
        <div className="user-box" ref={boxRef} >
          <nav className="sidebar-menu">
            <NavLink
              to="/settings"
              end
              // className={({ isActive }) =>
              //   `menu-item ${isActive ? "active" : ""}`
              // }
              className="menu-item"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>

              Setting
              </span>
            </NavLink>
          </nav>

          <p onClick={handleLogout} style={{ cursor: "pointer", marginTop: "10px" }} className="menu-item">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>


            <span>
              LogOut

            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default User;
