import React, { use, useEffect, useState } from "react";
import "../style/Testing.css";
import { useLocation } from "react-router-dom";
import { getAllTracks } from "../api";
const Favorites = ({ setCurrentTrack }) => {
    const [favorites, setFavorites] = useState([]);

    // const { id } = useParams();
    const { state } = useLocation();
    //   useEffect(() => {
    //     const storedFav =
    //       JSON.parse(localStorage.getItem("favorites")) || [];
    //     setFavorites(storedFav);
    //   }, []);

    //   const removeFavorite = (id) => {
    //     const updated = favorites.filter(
    //       (track) => track._id !== id
    //     );
    //     setFavorites(updated);
    //     localStorage.setItem(
    //       "favorites",
    //       JSON.stringify(updated)
    //     );
    //   };

    useEffect(() => {
        async function fetchFavoriteTracks() {
            try {
                const allTracks = await getAllTracks();
                if (!allTracks || !state?.songs) return;

                const favTracks = allTracks.data.filter(track =>
                    state.songs.includes(track._id)
                );

                setFavorites(favTracks);
            } catch (error) {
                console.error("Failed to fetch favorite tracks", error);
            }
        }

        fetchFavoriteTracks();
    }, [state?.songs]);




    return (
        <div className="home-container">
            <h1 style={{ marginBottom: "30px" }}>
                Favorites
            </h1>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <h2>No favorite songs yet 🎵</h2>
                    <p>Start adding songs to your favorites.</p>
                </div>
            ) : (
                <div className="recent-grid">
                    {favorites.map((track) => (
                        <div key={track._id} className="music-card">
                            <div
                                className="card-image"
                                onClick={() => setCurrentTrack(track)}
                            >
                                <img
                                    src={track.imageUrl}
                                    alt={track.title}
                                />
                                <div className="image-overlay"></div>
                                <div className="play-btn">▶</div>
                            </div>

                            <div className="card-info">
                                <h4>{track.title}</h4>
                                <p>{track.artists?.[0]}</p>

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFavorite(track._id)
                                    }
                                >
                                    Remove ❤️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
