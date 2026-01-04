// // import Song from "../models/song.js";

// import Song from "../models/Song";

// /* ================= CREATE SONG ================= */
// export const createSong = async (req, res, next) => {
//     try {
//         const {
//             title,
//             // artist,
//             album,
//             genre,
//             audioUrl,
//             coverImage,
//             duration,
//         } = req.body;
// const artists = JSON.parse(req.body.artists); // converts back to array

//         const song = await Song.create({
//             title,
//             artists,
//             album,
//             genre,
//             audioUrl,
//             coverImage,
//             duration,
//             uploadedBy: req.user._id,
//         });

//         res.status(201).json(song);
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= GET ALL SONGS ================= */
// export const getAllSongs = async (req, res, next) => {
//     try {
//         const songs = await Song.find({ isPublic: true })
//             .populate("uploadedBy", "name")
//             .sort({ createdAt: -1 });

//         res.json(songs);
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= GET SINGLE SONG ================= */
// export const getSongById = async (req, res, next) => {
//     try {
//         const song = await Song.findById(req.params.id).populate(
//             "uploadedBy",
//             "name"
//         );

//         if (!song) {
//             return res.status(404).json({ msg: "Song not found" });
//         }

//         res.json(song);
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= UPDATE SONG ================= */
// export const updateSong = async (req, res, next) => {
//     try {
//         const song = await Song.findById(req.params.id);

//         if (!song) {
//             return res.status(404).json({ msg: "Song not found" });
//         }

//         // only owner can update
//         if (song.uploadedBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ msg: "Not authorized" });
//         }

//         Object.assign(song, req.body);
//         await song.save();

//         res.json(song);
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= DELETE SONG ================= */
// export const deleteSong = async (req, res, next) => {
//     try {
//         const song = await Song.findById(req.params.id);

//         if (!song) {
//             return res.status(404).json({ msg: "Song not found" });
//         }

//         if (song.uploadedBy.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ msg: "Not authorized" });
//         }

//         await song.deleteOne();
//         res.json({ msg: "Song deleted successfully" });
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= LIKE / UNLIKE SONG ================= */
// export const toggleLikeSong = async (req, res, next) => {
//     try {
//         const song = await Song.findById(req.params.id);

//         if (!song) {
//             return res.status(404).json({ msg: "Song not found" });
//         }

//         const userId = req.user._id;

//         const isLiked = song.likes.includes(userId);

//         if (isLiked) {
//             song.likes.pull(userId);
//         } else {
//             song.likes.push(userId);
//         }

//         await song.save();
//         res.json({ likes: song.likes.length });
//     } catch (error) {
//         next(error);
//     }
// };

// /* ================= PLAY SONG ================= */
// export const playSong = async (req, res, next) => {
//     try {
//         const song = await Song.findById(req.params.id);

//         if (!song) {
//             return res.status(404).json({ msg: "Song not found" });
//         }

//         song.plays += 1;
//         await song.save();

//         res.json({ plays: song.plays });
//     } catch (error) {
//         next(error);
//     }
// };


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
