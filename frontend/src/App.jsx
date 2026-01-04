import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Player from "./Components/Player";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import ArtistDetail from "./pages/ArtistDetail";
import PlayList from "./pages/PlayList";
import Player from "./Components/Player";
import AlbumsFeature from "./pages/AlbumsFeature";
import { useState } from "react";
// import AlbumsFeature from "./pages/AlbumsFeature";

const App = () => {

    const [currentTrack, setCurrentTrack] = useState(null);

  return (
<>
    <div className="app bg-red-500 flex">
      {/* Sidebar Container */}
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div className="main-container">
        <Header />
        {/* <Home /> */}

        <Routes>
          <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/playlists" element={<PlayList />} />
          <Route path="/artist/:id" element={<ArtistDetail setCurrentTrack={setCurrentTrack}/>} />
          <Route path="/albums/:id" element={<AlbumsFeature setCurrentTrack={setCurrentTrack}/>} />

          {/* <Route path="/liked" element={<LikedSongs />} /> */}
        </Routes>
        {/* <Player track={currentTrack} /> */}
      </div>

    </div>
<Player track={currentTrack} />
</>
  );
};

export default App;
