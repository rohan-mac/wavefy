// import mongoose from "mongoose";

// const songSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     artist: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     album: {
//       type: String,
//       default: "Single",
//     },

//     genre: {
//       type: String,
//       default: "Unknown",
//     },

    

//     audioUrl: {
//       type: String,
//       required: true,
//     },

//     coverImage: {
//       type: String,
//       default:
//         "https://res.cloudinary.com/demo/image/upload/v1690000000/music-default.png",
//     },

//     duration: {
//       type: Number, // seconds
//       required: true,
//     },

//     plays: {
//       type: Number,
//       default: 0,
//     },

//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     uploadedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     isPublic: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Song", songSchema);



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
