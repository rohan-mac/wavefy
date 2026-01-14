

import Song from "../models/Song.js";
import cloudinary from "../config/cloudinary.js";

/* ========== CREATE SONG ========== */
export const createSong = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Parse artists array
    const artists = JSON.parse(req.body.artists);

    if (!req.files?.audio || !req.files?.image) {
      return res.status(400).json({ error: "Audio and image required" });
    }

    // Upload audio
    const audioUpload = await cloudinary.uploader.upload(
      req.files.audio[0].path,
      { resource_type: "video" }
    );

    // Upload image
    const imageUpload = await cloudinary.uploader.upload(
      req.files.image[0].path
    );

    const song = await Song.create({
      title,
      artists,
      audioUrl: audioUpload.secure_url,
      imageUrl: imageUpload.secure_url,
      duration: audioUpload.duration,
    });

    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()


    return res.status(200).json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error("getAllSongs error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch songs",
    });
  }
};


export const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).populate(
      "uploadedBy",
      "name"
    );
    if (!song) {
      return res.status(404).json({ msg: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
};
