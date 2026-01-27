// import React, { useState } from "react";
// import "../AddSong.css";

// const AddSong = () => {
//   const [title, setTitle] = useState("");
//   const [artistInput, setArtistInput] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !artistInput || !audio || !image) {
//       setMessage("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       const artistsArray = artistInput
//         .split(",")
//         .map((a) => a.trim())
//         .filter(Boolean);

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("artists", JSON.stringify(artistsArray));
//       formData.append("audio", audio);
//       formData.append("image", image);

//       const BASE_URL = "https://wavefy.onrender.com/api";

//       const res = await fetch(`${BASE_URL}/songs/add-song`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Upload failed");
//       }

//       setMessage("✅ Song uploaded successfully");
//       setTitle("");
//       setArtistInput("");
//       setAudio(null);
//       setImage(null);
//     } catch (err) {
//       setMessage("❌ " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-song-page">
//       <div className="add-song-card">
//         <h2>Add New Song</h2>
//         <p className="subtitle">Upload your track & cover</p>

//         <form className="add-song-form" onSubmit={handleSubmit}>
//           <input
//             className="input"
//             type="text"
//             placeholder="Song Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <input
//             className="input"
//             type="text"
//             placeholder="Artists (comma-separated)"
//             value={artistInput}
//             onChange={(e) => setArtistInput(e.target.value)}
//           />

//           <label className="file-input">
//             🎵 {audio ? audio.name : "Select audio file"}
//             <input
//               type="file"
//               accept="audio/*"
//               onChange={(e) => setAudio(e.target.files[0])}
//             />
//           </label>

//           <label className="file-input">
//             🖼 {image ? image.name : "Select cover image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>

//           <button className="button" disabled={loading}>
//             {loading ? "Uploading..." : "Upload Song"}
//           </button>
//         </form>

//         {message && (
//           <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddSong;

import React, { useState } from "react";
import "../AddSong.css";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artistInput, setArtistInput] = useState("");
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

      const artistsArray = artistInput
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artists", JSON.stringify(artistsArray));
      formData.append("audio", audio);
      formData.append("image", image);

      const BASE_URL = "https://wavefy.onrender.com/api";

      const res = await fetch(`${BASE_URL}/songs/add-song`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage("✅ Song uploaded successfully");
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
    <div className="add-song-page">
      <div className="add-song-card">
        <h2>Add New Song</h2>
        <p className="subtitle">Upload audio & cover art</p>

        {/* 🔥 IMAGE PREVIEW (LIKE ADD ARTIST) */}
        {image && (
          <div className="preview">
            <img src={URL.createObjectURL(image)} alt="Cover Preview" />
          </div>
        )}

        <form className="add-song-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Artists (comma-separated)"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
          />

          <label className="file-input">
            🎵 {audio ? audio.name : "Select audio file"}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </label>

          {/* 🎧 AUDIO PREVIEW */}
          {audio && (
            <audio className="audio-preview" controls>
              <source src={URL.createObjectURL(audio)} />
            </audio>
          )}

          <label className="file-input">
            {image ? image.name : "Select cover image"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button className="button" disabled={loading}>
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </form>

        {message && (
          <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddSong;
