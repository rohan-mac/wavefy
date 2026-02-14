import { useParams, useLocation } from "react-router-dom";
import "../style/ArtistDetail.css";
import { useEffect, useState } from "react";
import { getAllTracks } from "../api";
const ArtistDetail = ({ setCurrentTrack }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const [artistPopularSongs, setArtistPopularSongs] = useState(state?.Songs || []);
  const [activeSong, setActiveSong] = useState(null);
  console.log(state);




  useEffect(() => {
    async function fetchArtistSongs() {
      try {
        const allTracks = await getAllTracks();

        if (!allTracks || !state?.songs) return;

        // Filter only artist songs using ID match
        const filteredSongs = allTracks.data.filter(track =>
          state.songs.includes(track._id)
        );
        // Optional: keep order same as artist song IDs
        const sortedSongs = state.songs
          .map(id => filteredSongs.find(song => song._id === id))
          .filter(Boolean);
        console.log(sortedSongs);

        setArtistPopularSongs(sortedSongs);
      } catch (error) {
        console.error("Failed to fetch artist songs", error);
      }
    }

    fetchArtistSongs();
  }, [state?.Songs]);


  const handlePlayAll = () => {
    if (artistPopularSongs.length > 0) {
      setCurrentTrack(artistPopularSongs[0]);
      setActiveSong(artistPopularSongs[0]._id);
    }
  };


  return (
    <div className="artist-detail">

      {/* ===== Banner ===== */}
      <div className="artist-banner">
        <img
          src={state?.Image || state.profileImage || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
          alt={state?.Name}
          className="artist-banner-img"
        />

        <div className="artist-banner-info">
          <span className="artist-label">Artist</span>
          <h1>{state?.Name || state?.title || "Unknown Artist"}</h1>
          <p className="artist-id">
            {artistPopularSongs.length} Popular Songs
          </p>
        </div>
      </div>

      {/* ===== Actions ===== */}
      <div className="artist-actions">
        <button className="play-btn" onClick={handlePlayAll}>
          ▶ Play
        </button>
        <button className="follow-btn">Follow</button>
      </div>

      {/* ===== Songs ===== */}
      <div className="artist-songs">
        <h3 className="section-title">Popular Songs</h3>

        {artistPopularSongs.length === 0 ? (
          <div className="song-list empty">
            <p>No popular songs available.</p>
          </div>
        ) : (
          <div className="song-list">
            {artistPopularSongs.map((song, index) => (
              <div
                key={index}
                className={`song-item ${activeSong === song._id ? "active" : ""}`}
                onClick={() => {
                  setCurrentTrack(song);
                  setActiveSong(song._id);
                }}
              >
                <div className="tumbnaill">
                  <div className="thumblel-image">
                    <img
                      src={song.Image || song.imageUrl || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
                      alt={song.Name || song.name || "Unknown Song"}
                    />
                  </div>

                  <div className="song-text">
                    <span className="song-name">{song.Name || song.title || "Unknown Song"}</span>
                    <span className="song-artist">{state?.Name || state?.name || "Unknown Artist"}</span>
                  </div>
                </div>

                <div className="dots">
                  <span className="three-dots">⋮</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ArtistDetail;
