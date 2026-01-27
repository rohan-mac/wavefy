import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1690000000/artist-default.png",
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Artist", artistSchema);
