import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import PlayList from "./pages/PlayList";
import Player from "./Components/Player";
import AlbumsFeature from "./pages/AlbumsFeature";
import { useState, useEffect } from "react";
import LoginSignup from "./pages/LoginSignup";
import AddSong from "./pages/AddSong";
import Users from "./pages/Users";
import Songs from "./pages/Songs";

// let isadmin = false

const App = () => {


  const [currentTrack, setCurrentTrack] = useState(null);
  const [user, setUser] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("wavefytoken");
    // localStorage.setItem("wavefytoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWQ1YTRmMzY3MjEwZjc1NWJmZjE0ZiIsImlhdCI6MTc2NzcyNTY0NywiZXhwIjoxNzY4MzMwNDQ3fQ.YvgT09aFAVWjwIHN8hRtH-ltunKSA0ocnSysUGY661Y")
    if (!token) {
      setUserIsLoggedIn(false);
      return;
    }

    fetch("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setUserIsLoggedIn(true);
        if (data.role === "admin") {
          setIsAdmin(true)
          // isadmin = true
        }


      })

      .catch(() => {
        localStorage.removeItem("wavefytoken");
        setUser(null);
        setUserIsLoggedIn(false);
      });
  }, []);



  return (
    <>
      {userIsLoggedIn ? (
        <div className="app flex">
          {/* Sidebar */}
          <div className="sidebar-container">
            <Sidebar isadmin={isadmin} />
          </div>

          {/* Main Content */}
          <div className="main-container">
            <Header user={user} />

            <Routes>
              <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/playlists" element={<PlayList />} />
              <Route
                path="/artist/:id"
                element={<ArtistDetail setCurrentTrack={setCurrentTrack} />}
              />
              <Route
                path="/albums/:id"
                element={<AlbumsFeature setCurrentTrack={setCurrentTrack} />}
              />
              <Route path="/addsong" element={<AddSong />} />
              <Route path="/users" element={<Users />} />
              <Route path="/songs" element={<Songs />} />
            </Routes>
          </div>

          {/* Player always visible when logged in */}
          <Player track={currentTrack} />
        </div>
      ) : (
        <LoginSignup />
      )}
    </>
  );
};

// export default isadmin
export default App;


{/* // <div className="app bg-red-500 flex">
      //   {/* Sidebar Container */}
//   <div className="sidebar-container">
//     <Sidebar />
//   </div>

//   {/* Main Content Container */}
//   <div className="main-container">
//     <Header />
//     {/* <Home /> */}

//     <Routes>
//       <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} />} />
//       <Route path="/artists" element={<Artists />} />
//       <Route path="/albums" element={<Albums />} />
//       <Route path="/playlists" element={<PlayList />} />
//       <Route path="/artist/:id" element={<ArtistDetail setCurrentTrack={setCurrentTrack} />} />
//       <Route path="/albums/:id" element={<AlbumsFeature setCurrentTrack={setCurrentTrack} />} />

//       {/* <Route path="/liked" element={<LikedSongs />} /> */}
//     </Routes>
//     {/* <Player track={currentTrack} /> */}
//   </div>

// </div> */}