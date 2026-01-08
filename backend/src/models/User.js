// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user"
//   }
//   // playlist: {
//   //   type: Object,
//   //   default: []
//   // }


// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    coverImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ❤️ Favourite songs
    favouriteSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],

    // 🎤 Favourite artists
    favouriteArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],

    // 💿 Favourite albums
    favouriteAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],

    // 📂 User playlists
    playlists: [playlistSchema],

    // 🎧 Recently played songs
    recentlyPlayed: [
      {
        song: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song",
        },
        playedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ⚙️ Preferences
    preferences: {
      theme: {
        type: String,
        enum: ["dark", "light"],
        default: "dark",
      },
      language: {
        type: String,
        default: "en",
      },
      autoplay: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
