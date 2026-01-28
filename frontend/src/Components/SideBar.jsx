
// import { NavLink } from "react-router-dom";
// import User from "./Header.User";

// const Sidebar = ({ isadmin }) => {

//   return (
//     <aside className="sidebar">

//       {/* Logo */}
//       <div className="sidebar-logo">
//         <span className="app-name">MyMusic</span>
//       </div>

//       {/* Menu */}
//       <nav className="sidebar-menu">
//         <NavLink
//           to="/"
//           end
//           className={({ isActive }) =>
//             `menu-item ${isActive ? "active" : ""}`
//           }
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to="/artists"
//           className={({ isActive }) =>
//             `menu-item ${isActive ? "active" : ""}`
//           }
//         >
//           Artists
//         </NavLink>

//         <NavLink
//           to="/albums"
//           className={({ isActive }) =>
//             `menu-item ${isActive ? "active" : ""}`
//           }
//         >
//           Albums
//         </NavLink>

//         <NavLink
//           to="/playlists"
//           className={({ isActive }) =>
//             `menu-item ${isActive ? "active" : ""}`
//           }
//         >
//           Playlists
//         </NavLink>

//         {isadmin ? (
//           <>
//             <NavLink to="/users"
//               className={({ isActive }) =>
//                 `menu-item ${isActive ? "active" : ""}`
//               }>
//               Users
//             </NavLink>
//             <NavLink
//               to="/songs"
//               className={({ isActive }) =>
//                 `menu-item ${isActive ? "active" : ""}`
//               }
//             >
//               Songs
//             </NavLink>
//             <NavLink
//               to="/addsong"
//               className={({ isActive }) =>
//                 `menu-item ${isActive ? "active" : ""}`
//               }
//             >
//               Add Song

//             </NavLink>

//             <NavLink
//               to="/addartist"
//               className={({ isActive }) =>
//                 `menu-item ${isActive ? "active" : ""}`
//               }
//             >
//               Add Artist

//             </NavLink>
//           </>

//         ) : (null)}
//       </nav>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         <span>🎧 Now Playing</span>
//       </div>

//     </aside>
//   );
// };

// export default Sidebar;




import { NavLink } from "react-router-dom";
import User from "./Header.User";
import "../Sidebar.css";
const Sidebar = ({ isadmin }) => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0095f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        <span className="app-name">MyMusic</span>
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
              <span>Add Song</span>
            </NavLink>
            <NavLink to="/addartist" className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
              <span>Add Artist</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* <User /> */}
      </div>
    </aside>
  );
};

export default Sidebar;