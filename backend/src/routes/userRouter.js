import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/logout", logoutUser);
router.delete("/delete", protect, deleteUser);

export default router;
