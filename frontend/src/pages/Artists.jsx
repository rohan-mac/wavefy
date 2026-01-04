import { useEffect, useState } from "react";
import { getArtists } from "../api";
import "../Artists.css";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        console.log(data, "artists data");
        setArtists(data.data || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };22

    fetchArtists();
  }, []);


  function ArtistSong(artist) {
    console.log(artist);
    
    navigate(`/artist/${artist._id}`, { state: artist });
  }


  console.log(artists.length);
  
  return (
    <div className="artists">
      {artists.length === 0 ? (
        <>
        <Loader />
        {/* ghjkldfghjkl */}
        </>
      ) : (
        <div className="artist-list">
          {artists.map((artist, index) => (
            <div key={index} className="artist-card" onClick={()=>ArtistSong(artist)}>
              <img
                src={artist.Image || "src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
                alt={artist.Name || "Unknown Artist"}
                width="100%"
                height="100%"
              />
              <div className="artist-name">
                <p>{artist.Name || "Unknown Artist"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;