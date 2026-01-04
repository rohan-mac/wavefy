// // import express from "express";
// // import {
// //   createSong,
// //   getAllSongs,
// //   getSongById,
// //   updateSong,
// //   deleteSong,
// //   toggleLikeSong,
// //   playSong,
// // } from "../controllers/songController.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // router.get("/", getAllSongs);
// // router.get("/:id", getSongById);

// // router.post("/", protect, createSong);
// // router.put("/:id", protect, updateSong);
// // router.delete("/:id", protect, deleteSong);

// // router.post("/:id/like", protect, toggleLikeSong);
// // router.post("/:id/play", playSong);

// // export default router;


// import express from "express";
// import cloudinary from "../config/cloudinary.js";
// import { upload } from "../middleware/multer.middleware.js";
// import Song from "../models/Song.js";

// const router = express.Router();

// router.post(
//   "/add-song",
//   upload.fields([
//     { name: "audio", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const { title, artist } = req.body;

//       // Upload audio
//       const audioUpload = await cloudinary.uploader.upload(
//         req.files.audio[0].path,
//         { resource_type: "video" } // IMPORTANT for audio
//       );

//       // Upload image
//       const imageUpload = await cloudinary.uploader.upload(
//         req.files.image[0].path,
//         { resource_type: "image" }
//       );

//       const song = await Song.create({
//         title,
//         artist,
//         audioUrl: audioUpload.secure_url,
//         imageUrl: imageUpload.secure_url,
//         duration: audioUpload.duration,
//       });

//       res.status(201).json({
//         success: true,
//         song,
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

// export default router;

import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createSong } from "../controllers/songController.js";

const router = express.Router();

router.post(
  "/add-song",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createSong
);

export default router;
