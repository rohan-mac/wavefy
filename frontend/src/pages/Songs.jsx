import React, { useEffect, useState } from "react";
import "../Songs.css";
import { getAllTracks } from "../api";
import Loader from "../Components/Loader";
import ArtistSelect from "../Components/ArtistSelect ";
const Songs = ({ setCurrentTrack }) => {
  const [allTracks, setAllTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await getAllTracks(); // uses fetch internally
        setAllTracks(response.data);
        setFilteredTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    }

    fetchTracks();
  }, []);



  const handleArtistChange = (artist) => {
    setSelectedArtist(artist);

    if (!artist) {
      setFilteredTracks(allTracks);
      return;
    }

    const filtered = allTracks.filter((song) =>
      song.artists?.some((a) =>
        a.toLowerCase().includes(artist.toLowerCase())
      ) ?? false
    );

    setFilteredTracks(filtered);
  };



  return (
    <div className="songs-page">
      {/* <h1>Songs</h1> */}

<div className="song-filter">

      <ArtistSelect onArtistChange={handleArtistChange} />
</div>
      {/* Artist dropdown */}

      {filteredTracks.length > 0 ? (
        filteredTracks.map((song, index) => (
          <div
            key={index}
            className="song-item"
            onClick={() => {
              console.log(song, "song in songs ");

              setCurrentTrack?.(song);
            }}
          >
            <div className="tumbnaill">
              <div className="thumblel-image">
                <img
                  src={
                    song.imageUrl ||
                    "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                  }
                  alt={song.title || "song"}
                />
              </div>
              <span className="song-name">
                {song.title || "Unknown Song"}
              </span>
            </div>

            <div className="dots">
              <span className="three-dots">⋮</span>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Songs;
