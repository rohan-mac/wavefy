import { useParams, useLocation } from "react-router-dom";
import "../ArtistDetail.css";
import { useState } from "react";

const ArtistDetail = ({ setCurrentTrack }) => {
  const { id } = useParams();
  const { state } = useLocation();

  const [artistPopularSongs] = useState(state?.Songs || []);
  const [activeSong, setActiveSong] = useState(null);

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
          src={state?.Image || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
          alt={state?.Name}
          className="artist-banner-img"
        />

        <div className="artist-banner-info">
          <span className="artist-label">Artist</span>
          <h1>{state?.Name || "Unknown Artist"}</h1>
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
                      src={song.Image || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
                      alt={song.Name}
                    />
                  </div>

                  <div className="song-text">
                    <span className="song-name">{song.Name}</span>
                    <span className="song-artist">{state?.Name}</span>
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
