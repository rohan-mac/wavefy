import React, { useEffect, useState } from "react";
import FavouriteSongsPage from "../Components/FavouriteSongsPage";
import { getAllTracks } from "../api";
import "../style/FavouriteSongsPage.css";

const FAVORITES_STORAGE_KEY = "wavefy-favorite-song-ids";

const Favorites = ({ setCurrentTrack }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      const favouriteSongIds = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]");

      if (!favouriteSongIds.length) {
        setSongs([]);
        return;
      }

      try {
        const allTracks = await getAllTracks();
        const favTracks = allTracks.data
          .filter((track) => favouriteSongIds.includes(track._id))
          .map((track) => ({
            id: track._id,
            title: track.title,
            artist: track.artists?.[0] || "Unknown Artist",
            coverImage: track.imageUrl,
            track,
          }));

        setSongs(favTracks);
      } catch (error) {
        console.error("Failed to fetch favorite tracks", error);
        setSongs([]);
      }
    };

    fetchFavoriteTracks();
  }, []);

  const handleDeleteSong = (songId) => {
    const nextSongs = songs.filter((song) => song.id !== songId);
    const nextIds = nextSongs.map((song) => song.id);

    setSongs(nextSongs);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextIds));
  };

  const handlePlaySong = (song) => {
    setCurrentTrack(
      song.track || {
        _id: song.id,
        title: song.title,
        imageUrl: song.coverImage,
        artists: [song.artist],
      }
    );
  };

  const handleAddToPlaylist = (song) => {
    console.log(`Added ${song.title} to playlist`);
  };

  const handleViewSongDetails = (song) => {
    console.log(`Viewing details for ${song.title}`);
  };

  return (
    <FavouriteSongsPage
      songs={songs}
      onDeleteSong={handleDeleteSong}
      onPlaySong={handlePlaySong}
      onAddToPlaylist={handleAddToPlaylist}
      onViewSongDetails={handleViewSongDetails}
    />
  );
};

export default Favorites;
