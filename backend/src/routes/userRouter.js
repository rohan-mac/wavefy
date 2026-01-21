import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  deleteUser,
  allUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
// router.put("/profile", protect, updateUser); // ✅ UPDATE
router.delete("/:id", protect, deleteUser);
router.get("/allusers", getAllUsers);

export default router;
