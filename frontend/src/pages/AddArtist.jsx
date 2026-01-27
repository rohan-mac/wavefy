import React, { useState } from "react";
import "../AddArtist.css";

const AddArtist = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
    const BASE_URL = "https://wavefy.onrender.com/api";


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !bio || !image) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("image", image);

        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/artists/createartist`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            //   alert("Artist added successfully 🎉");
            console.log("Artist added successfully 🎉", await res.json());

            setName("");
            setBio("");
            setImage(null);
            setPreview(null);
            e.target.reset();

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="artist-page">
            <div className="artist-car">
                <h2>Add New Artist</h2>
                <p className="subtitle">Create artist profile for your music app</p>

                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Artist Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                    />

                    <textarea
                        placeholder="Artist Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="textarea"
                    />

                    <label className="image-upload">
                        Upload Artist Image
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>

                    {preview && (
                        <div className="preview">
                            <img src={preview} alt="Preview" />
                        </div>
                    )}

                    <button className="button" disabled={loading}>
                        {loading ? "Uploading..." : "Add Artist"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddArtist;
