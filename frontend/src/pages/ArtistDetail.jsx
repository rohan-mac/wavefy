import { useParams, useLocation } from "react-router-dom";
import "../ArtistDetail.css";
import { useState } from "react";
import Player from "../Components/Player";

const ArtistDetail = ({ setCurrentTrack }) => {
    const { id } = useParams();
    const { state } = useLocation();
    const [artistPopularSongs, setArtistPopularSongs] = useState(state.Songs || []);
    // const [currentTrack, setCurrentTrack] = useState(null);

    return (
        <div className="artist-detail">

            {/* ===== Banner Section ===== */}
            <div className="artist-banner">
                <img
                    src={
                        state?.Image ||
                        "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                    }
                    alt={state?.Name}
                    className="artist-banner-img"
                />

                <div className="artist-banner-info">
                    <span className="artist-label">Artist</span>
                    <h1>{state?.Name || "Unknown Artist"}</h1>
                    {/* <p className="artist-id">Artist ID: {id}</p> */}
                </div>
            </div>

            {/* ===== Action Buttons ===== */}
            <div className="artist-actions">
                <button className="play-btn">▶ Play</button>
                <button className="follow-btn">Follow</button>
            </div>

            {/* ===== About Section ===== */}
            <div className="artist-about">
                {/* <h3>About</h3>
                <p>
                    This is one of the popular artists on MyMusic.
                    More details and biography will be available soon.
                </p> */}
            </div>

            {/* ===== Songs Section ===== */}
            <div className="artist-songs">

                <div className="song-list empty">
                    <h3>Popular Songs</h3>
                    {/* <p>🎵 Songs will be displayed here</p> */}

                    {artistPopularSongs.length === 0 ? (
                        <p>No popular songs available.</p>
                    ) : (
                        // <p>🎵 Songs will be displayed here</p>
                        artistPopularSongs.map((song, index) => (

                            <div key={index} className="song-item" onClick={() => {
                                console.log("jkkjsdkjfkjdfj")
                                setCurrentTrack(song)
                            }
                            }>
                                {/* <span className="song-index">{index + 1}.</span>
                <span className="song-name">{song.Name || "Unknown Song"}</span> */}

                                <div className="tumbnaill">
                                    <div className="thumblel-image">

                                        <img src={song.Image || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"} alt="song" width="100%  "
                                            height="100%" />
                                    </div>
                                    <span className="song-name">{song.Name || "Unknown Song"}</span>
                                </div>
                                <div className="song-info">
                                </div>
                                <div className="dots">
                                    <span className="three-dots">⋮</span>

                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* <Player track={currentTrack} /> */}

        </div>
    );
};

export default ArtistDetail;
