import React, { useEffect, useMemo, useState } from "react";
import { getAllTracks } from "../api";
import "../style/Testing.css";
import SongSkeleton from "../Components/SongSkeleton";
import SongCard from "../Components/SongCard";

const FAVORITES_STORAGE_KEY = "wavefy-favorite-song-ids";

const Home = ({ setCurrentTrack, user }) => {
  const [allTracks, setAllTracks] = useState([]);
  const [favoriteSongIds, setFavoriteSongIds] = useState([]);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await getAllTracks();
        setAllTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }

    fetchTracks();
  }, []);

  useEffect(() => {
    const storedFavouriteIds = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]");
    setFavoriteSongIds(storedFavouriteIds);
  }, []);

  const favoriteIdSet = useMemo(() => new Set(favoriteSongIds), [favoriteSongIds]);

  const updateFavorites = (nextIds) => {
    setFavoriteSongIds(nextIds);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextIds));
  };

  const toggleFavourite = (track) => {
    const isFavourite = favoriteIdSet.has(track._id);

    if (isFavourite) {
      updateFavorites(favoriteSongIds.filter((id) => id !== track._id));
      return;
    }

    updateFavorites([...favoriteSongIds, track._id]);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning ";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon ";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening ";
    }

    return "Good Night ";
  };

  return (
    <div className="home-container">
      <section className="top-banner">
        <div className="banner-content">
          <h1>
            {getGreeting()}, {user?.name || "Music Lover"} 🎧
          </h1>
          <p>What do you want to listen today?</p>
        </div>
      </section>

      <section className="music-section">
        <h2>Featured For You</h2>

        <div className="horizontal-scroll">
          {allTracks.length === 0
            ? Array.from({ length: 6 }).map((_, index) => <SongSkeleton key={index} />)
            : allTracks.map((track, index) => {
              const songData = {
                id: track._id,
                title: track.title,
                artist: track.artists?.[0] || "Unknown Artist",
                coverImage:
                  track.imageUrl || "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png",
              };

              const isFavourite = favoriteIdSet.has(track._id);

              return (
                <div key={track._id || index}>
                  <SongCard
                    song={songData}
                    primaryActionLabel={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                    onPrimaryAction={() => toggleFavourite(track)}
                    onPlay={() => setCurrentTrack(track)}
                    onAddToPlaylist={() => console.log(`Add ${track.title} to playlist`)}
                    onViewDetails={() => console.log(`View details for ${track.title}`)}
                    onCardClick={() => setCurrentTrack(track)}
                  />
                </div>
              );
            })}
        </div>
      </section>

      <section className="music-section">
        <h2>Recently Played</h2>

        <div className="recent-grid">
          {allTracks.slice(0, 6).map((track, index) => (
            <div key={index} className="recent-card" onClick={() => setCurrentTrack(track)}>
              <img
                src={
                  track.imageUrl || "frontend/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                }
                alt={track.title}
              />
              <div>
                <h4>{track.title}</h4>
                <p>{track.artists?.[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
