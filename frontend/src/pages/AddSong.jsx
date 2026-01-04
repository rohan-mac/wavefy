import React, { useState } from "react";
import "../AddSong.css";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artistInput, setArtistInput] = useState(""); // user types comma-separated names
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artistInput || !audio || !image) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Convert comma-separated artist names into array
      const artistsArray = artistInput
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artists", JSON.stringify(artistsArray)); // send as JSON string
      formData.append("audio", audio);
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/songs/add-song", {
        method: "POST",
        body: formData,
      });
console.log(formData);

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage("✅ Song uploaded successfully");

      // reset form
      setTitle("");
      setArtistInput("");
      setAudio(null);
      setImage(null);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-song-container">
      <h2>Add New Song</h2>

      <form className="add-song-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Artists (comma-separated)"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
        />

        <label className="file-input">
          🎵 Audio File
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
          />
        </label>

        <label className="file-input">
          🖼 Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <button disabled={loading}>
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>

      {message && (
        <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddSong;
