import React, { useEffect, useState } from "react";
import { getAllArtist } from "../api";

const ArtistSelect = ({ onArtistChange }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");

  useEffect(() => {
    async function fetchArtists() {
      const data = await getAllArtist();
      setArtists(data || []);
    }
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    setSelectedArtist(e.target.value);
    onArtistChange(e.target.value); // send selected artist to parent
  };

  return (
    <select value={selectedArtist} onChange={handleChange}>
      <option value="">Select Artist</option>

      {artists.map((artist) => (
        <option key={artist._id} value={artist.name}>
          {artist.name}
        </option>
      ))}
    </select>
  );
};

export default ArtistSelect;
