import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  deleteUser,
  allUser,
  getAllUsers,
  addUserFavourite,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// router.post("/register", registerUser);\\
router.post(
  "/register",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  registerUser
);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUser); // ✅ UPDATE
router.delete("/:id", protect, deleteUser);
router.get("/allusers", getAllUsers);
router.post("/favourite/:songId", protect, addUserFavourite);
export default router;
