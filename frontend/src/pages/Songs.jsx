import React, { useEffect } from "react";
import "../Songs.css";
import { getAllTracks } from "../api";
import axios from "axios";
import Loader from "../Components/Loader";

const Songs = ({ setCurrentTrack }) => { // ✅ receive setCurrentTrack as prop
  const [allTracks, setAllTracks] = React.useState([]);

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

  const handleLikeSong = async (songId) => {
    const token = localStorage.getItem("wavefytoken");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/favourite/${songId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data.message);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };


  console.log("All Tracks:", allTracks);

  return (
    <div className="songs-page">
      <h1>Songs</h1>
      {allTracks.length > 0 ? (
        allTracks.map((song, index) => (
          <div
            key={index}
            className="song-item"
            onClick={() => setCurrentTrack && setCurrentTrack(song)} // ✅ safe check
          >
            <div className="tumbnaill">
              <div className="thumblel-image">
                <img
                  src={
                    song.imageUrl ||
                    "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"
                  }
                  alt={song.Name || "song"}
                  width="100%"
                  height="100%"
                />
              </div>
              <span className="song-name">{song.title || "Unknown Song"}</span>
            </div>

            <div className="song-info">
              {/* optional artist info */}
              {/* <button onClick={() => handleLikeSong(song._id)}>❤️ Like</button> */}

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
