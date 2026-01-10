import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
/* ================= REGISTER ================= */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      playlists: [],
      favouriteSongs: [],
      favouriteAlbums: [],
      favouriteArtists: [],
      recentlyPlayed: [],
    });

    const token = generateToken(user._id);

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};


/* ================= LOGIN ================= */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }
    console.log(email, password, " 👍👍")
    const user = await User.findOne({ email });
    console.log(user, "🤦‍♂️🤦‍♂️");
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};


/* ================= PROFILE (PROTECTED) ================= */
export const getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profileImage: req.user.profileImage,
    playlists: req.user.playlists,
    favouriteSongs: req.user.favouriteSongs,
    role: req.user.role
  });
};


/* ================= LOGOUT (FRONTEND HANDLES IT) ================= */
export const logoutUser = async (req, res) => {
  res.json({ msg: "Logout successful" });
};



export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, password, profileImage, preferences } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (name) user.name = name;
    if (profileImage) user.profileImage = profileImage;
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }

    if (req.files && req.files.image) {
      try {
        const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path);
        user.profileImage = imageUpload.secure_url;
      } catch (error) {
        return res.status(400).json({ msg: 'Image upload failed' });
      }
    }

    if (password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      } catch (error) {
        return res.status(500).json({ msg: 'Password update failed' });
      }
    }

    await user.save();

    res.status(200).json({
      msg: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}


export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const allUser = async () => {
  try {
    console.log("all user function called");
    
    const users = await User.find();
    return users;

  } catch (error) {
    console.error("Error in all user function:", error);
    throw error; // important for controller to catch
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await allUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
