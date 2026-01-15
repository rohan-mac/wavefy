import React, { useEffect } from "react";
import "../ArtistDetail.css";
import { getAllTracks } from "../api";
const Songs = () => {
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
console.log("All Tracks:", allTracks);
    return (<>
        <div>
            <h1>Songs</h1>
            {
                    allTracks.map((song, index) => (

                            <div key={index} className="song-item" onClick={() => {
                                console.log("jkkjsdkjfkjdfj")
                                setCurrentTrack(song)
                            }
                            }>

                                <div className="tumbnaill">
                                    <div className="thumblel-image">

                                        <img src={song.imageUrl || "/src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"} alt="song" width="100%  "
                                            height="100%" />
                                    </div>
                                    <span className="song-name">{song.Name || "Unknown Song"}</span>
                                </div>
                                <div className="song-info">
                                    {/* <span className="song-artist">{song.Artist || "Unknown Artist"}</span> */}

                                </div>
                                <div className="dots">
                                    <span className="three-dots">⋮</span>

                                </div>

                            </div>
                        ))
            }
        </div></>)
}
export default Songs