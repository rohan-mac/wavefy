
import { NavLink } from "react-router-dom";
import User from "./Header.User";

const Sidebar = ({ isadmin }) => {

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <span className="app-name">MyMusic</span>
      </div>

      {/* Menu */}
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

        <NavLink
          to="/artists"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Artists
        </NavLink>

        <NavLink
          to="/albums"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Albums
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Playlists
        </NavLink>

        {isadmin ? (
          <NavLink
            to="/liked"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            Liked Songs
          </NavLink>
        ) : (null)}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <span>🎧 Now Playing</span>
      </div>

    </aside>
  );
};

export default Sidebar;
