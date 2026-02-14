import { useEffect, useState } from "react";
import "../style/Library.css";

const Library = ({ user }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setPlaylists([
      { id: 1, name: "My Favorites", songs: ["Song A", "Song B"] },
      { id: 2, name: "Chill Vibes", songs: ["Song C", "Song D"] },
    ]);
  }, []);

  if (!user) {
    return (
      <div className="library-container">
        <h2>Please login to view your library 🎵</h2>
      </div>
    );
  }

  return (
    <div className="library-container">
      <h1 className="library-title">Your Library</h1>

      <div className="library-grid">

        {/* Favorite Songs Block */}
        <div className="library-card favorite" 
        onClick={() => {
            console.log("Navigating to Favorite Songs...");
        }}>
          <div className="card-icon">❤️</div>
          <h2>Favorite Songs</h2>
          <p>{user?.favouriteSongs?.length || 0} songs</p>
        </div>

        {/* Liked Songs Block */}
        <div className="library-card liked">
          <div className="card-icon">👍</div>
          <h2>Liked Songs</h2>
          <p>{user?.likedSongs?.length || 0} songs</p>
        </div>

        {/* Playlists */}
        {playlists.map((playlist) => (
          <div key={playlist.id} className="library-card playlist">
            <div className="card-icon">🎵</div>
            <h2>{playlist.name}</h2>
            <p>{playlist.songs.length} songs</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Library;
