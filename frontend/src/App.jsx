import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import Home from "./pages/Home";
import "./style/App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import Player from "./Components/Player";
import AlbumsFeature from "./pages/AlbumsFeature";
import { useState, useEffect } from "react";
import LoginSignup from "./pages/LoginSignup";
import AddSong from "./pages/AddSong";
import Users from "./pages/Users";
import Songs from "./pages/Songs";
import AddArtist from "./pages/AddArtist";
import Settings from "./pages/Setting";
import Loader from "./Components/Loader";
import Library from "./pages/Library";
import Favorites from "./pages/Favoriet";
import PlayerPage from "./pages/PlayerPage";

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("wavefytoken");

    if (!token) {
      navigate("/login");
      setLoading(false);
      return;
    }

    fetch("https://wavefy.onrender.com/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        if (data.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch(() => {
        localStorage.removeItem("wavefytoken");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔄 Show loader while checking auth
  if (loading) {
    return <div className="loading-screen">
      <Loader />
    </div>;
  }

  // ❌ Not logged in → Show login page
  if (!user) {
    return <LoginSignup />;
  }

  // ✅ Logged in → Show full app
  return (
    <div className="app flex">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar isadmin={isAdmin} />
      </div>

      {/* Main Content */}
      <div className="main-container">
        <Header user={user} />

        <Routes>
          <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} user={user} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/library" element={<Library user={user} />} />
          <Route
            path="/favorites"
            element={
              <Favorites setCurrentTrack={setCurrentTrack} />
            }
          />
          <Route
            path="/player"
            element={
              <PlayerPage track={currentTrack} />
            }
          />

          <Route
            path="/artist/:id"
            element={<ArtistDetail setCurrentTrack={setCurrentTrack} />}
          />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route
            path="/albums/:id"
            element={<AlbumsFeature setCurrentTrack={setCurrentTrack} />}
          />
          <Route path="/addsong" element={<AddSong />} />
          <Route path="/users" element={<Users />} />

          <Route
            path="/songs"
            element={<Songs setCurrentTrack={setCurrentTrack} />}
          />
          <Route path="/addartist" element={<AddArtist />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Player */}
        <div className={`player-wrapper ${currentTrack ? "show" : ""}`}>
          {currentTrack && <Player track={currentTrack} />}
        </div>
      </div>
    </div>
  );
};

export default App;
