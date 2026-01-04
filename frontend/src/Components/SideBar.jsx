// import React from "react";
// import Player from "./Player";

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
      
//       {/* Logo */}
//       <div className="sidebar-logo">
//         <span className="app-name">MyMusic</span>
//       </div>

//       {/* Menu */}
//       <nav className="sidebar-menu">
//         <a className="menu-item active">Home</a>
//         <a className="menu-item">Artists</a>
//         <a className="menu-item">Albums</a>
//         <a className="menu-item"> Playlists</a>
//         <a className="menu-item"> Liked Songs</a>
//       </nav>

//       {/* Footer */}
//       <div className="sidebar-footer">
//         {/* <Player /> */}
//         <span>🎧 Now Playing</span>
//       </div>

//     </aside>
//   );
// };

// export default Sidebar;



// // import React from "react";
// // import { NavLink } from "react-router-dom";

// // const Sidebar = () => {
// //   return (


    
// //     <aside className="sidebar">

// //       {/* Logo */}
// //       <div className="sidebar-logo">
// //         <span className="app-name">MyMusic</span>
// //       </div>

// //       {/* Menu */}
// //       <nav className="sidebar-menu">
// //         <NavLink to="/" end className="menu-item">
// //           Home
// //         </NavLink>

// //         <NavLink to="/artists" className="menu-item">
// //           Artists
// //         </NavLink>

// //         <NavLink to="/albums" className="menu-item">
// //           Albums
// //         </NavLink>

// //         <NavLink to="/playlists" className="menu-item">
// //           Playlists
// //         </NavLink>

// //         <NavLink to="/liked" className="menu-item">
// //           Liked Songs
// //         </NavLink>
// //       </nav>

// //       {/* Footer */}
// //       <div className="sidebar-footer">
// //         <span>🎧 Now Playing</span>
// //       </div>

// //     </aside>
// //   );
// // };

// // export default Sidebar;
 
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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

        <NavLink
          to="/liked"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Liked Songs
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <span>🎧 Now Playing</span>
      </div>

    </aside>
  );
};

export default Sidebar;
