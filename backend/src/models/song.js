


import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

  artists: {
      type: [String], // array of artist names
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1690000000/music-default.png",
    },

    duration: {
      type: Number, // seconds
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
