import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  toggleLikeSong,
  playSong,
} from "../controllers/songController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);

router.post("/", protect, createSong);
router.put("/:id", protect, updateSong);
router.delete("/:id", protect, deleteSong);

router.post("/:id/like", protect, toggleLikeSong);
router.post("/:id/play", playSong);

export default router;
