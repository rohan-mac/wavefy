import {
    createArtist,
    deleteArtist,
    getAllArtists,
    getArtistById,
    updateArtist,
} from "../controllers/artistsController.js";
import express from "express";
import { upload } from "../middleware/multer.middleware.js";

const artistRoutes = express.Router();

artistRoutes.get("/", getAllArtists);
artistRoutes.get("/:id", getArtistById)
// artistRoutes.post("/createartist", createArtist);
artistRoutes.put("/:id", updateArtist);
artistRoutes.delete("/:id", deleteArtist);
artistRoutes.post(
  "/createartist",
  upload.single("image"),
  createArtist
);


export default artistRoutes;