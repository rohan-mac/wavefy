import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import FavouriteSongsPage from "../Components/FavouriteSongsPage";
import { getAllTracks } from "../api";
import { sampleSongs } from "../data/sampleSongs";
import "../style/FavouriteSongsPage.css";

const Favorites = ({ setCurrentTrack }) => {
  const { state } = useLocation();
  const [songs, setSongs] = useState(sampleSongs);

  const favouriteSongIds = useMemo(() => state?.songs || [], [state?.songs]);

  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      if (!favouriteSongIds.length) {
        setSongs(sampleSongs);
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

        setSongs(favTracks.length ? favTracks : sampleSongs);
      } catch (error) {
        console.error("Failed to fetch favorite tracks", error);
        setSongs(sampleSongs);
      }
    };

    fetchFavoriteTracks();
  }, [favouriteSongIds]);

  const handleDeleteSong = (songId) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  const handlePlaySong = (song) => {
    setCurrentTrack(song.track || {
      _id: song.id,
      title: song.title,
      imageUrl: song.coverImage,
      artists: [song.artist],
    });
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
