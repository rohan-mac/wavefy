import React from "react";
import { NavLink } from "react-router-dom";
import User from "./Header.User";
import "../Sidebar.css";
import logo from "../assets/logo.png";
import mainLogo from "../assets/mainlogo.png";
import image from "../assets/image.png";
const Sidebar = ({ isadmin }) => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        {/* <div className="brand-logo">
          <img src={image} alt="Logo" className="logo-image" />

          <span className="app-name">MyMusic</span>
        </div> */}
        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0095f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg> */}

        <div className="brand-logo">
          <img src={image} alt="Logo" className="logo-image" />

          <span className="app-name">
            {"Wavefy".split("").map((char, i) => (
              <span key={i} style={{ "--i": i + 1 }}>
                {char}
              </span>
            ))}
          </span>
        </div>

      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <NavLink to="/" end className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/artists" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>Artists</span>
        </NavLink>

        <NavLink to="/albums" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle></svg>
          <span>Albums</span>
        </NavLink>

        <NavLink to="/playlists" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg>
          <span>Playlists</span>
        </NavLink>
        <hr></hr>
        {isadmin && (
          <div className="admin-section admin-fab">
            <div className="admin-divider">Admin</div>
            <NavLink to="/users" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span>Users</span>
            </NavLink>
            <NavLink to="/songs" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              <span>Songs</span>
            </NavLink>
            <NavLink to="/addsong" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>

                <line x1="19" y1="13" x2="19" y2="21"></line>
                <line x1="15" y1="17" x2="23" y2="17"></line>
              </svg>              <span>Add Song</span>

            </NavLink>
            <NavLink to="/addartist" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>

                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="16" y1="11" x2="22" y2="11"></line>
              </svg>

              <span>Add Artist</span>


            </NavLink>
          </div>
        )}
      </nav>

      {/* Footer */}
      {/* <div className="sidebar-footer">
        <User />
      </div> */}
    </aside>
  );
};

export default Sidebar;