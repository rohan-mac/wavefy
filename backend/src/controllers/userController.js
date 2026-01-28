import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import Song from "../models/song.js";

/* ================= REGISTER ================= */
export const registerUser = async (req, res, next) => {
  try {
    console.log("Register endpoint hit");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    let userprofileImage = "";

    if (req.files?.profileImage?.length) {
      const imageUpload = await cloudinary.uploader.upload(
        req.files.profileImage[0].path
      );
      userprofileImage = imageUpload.secure_url; // ✅ THIS IS THE URL
    }


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      playlists: [],
      favouriteSongs: [],
      favouriteAlbums: [],
      favouriteArtists: [],
      recentlyPlayed: [],
      profileImage: userprofileImage,
    });

    console.log("User created:", user);
    const token = generateToken(user._id);

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: userprofileImage
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "Registration failed" });
  }

};


// export const registerUser = async (req, res) => {
//   try {
//     console.log("✅ Register endpoint hit");

//     let { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     email = email.toLowerCase();

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     let userprofileImage = "";

//     if (req.files?.profileImage?.length) {
//       try {
//         const imageUpload = await cloudinary.uploader.upload(
//           req.files.profileImage[0].path,
//           { folder: "wavefy/users" }
//         );
//         userprofileImage = imageUpload.secure_url;
//       } catch (uploadError) {
//         console.error("Cloudinary error:", uploadError);
//         return res.status(500).json({ msg: "Image upload failed" });
//       }
//     }

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       profileImage: userprofileImage,
//       playlists: [],
//       favouriteSongs: [],
//       favouriteAlbums: [],
//       favouriteArtists: [],
//       recentlyPlayed: [],
//     });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       msg: "User registered successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage,
//       },
//     });

//   } catch (error) {
//     console.error("❌ Register error:", error);
//     res.status(500).json({ msg: "Registration failed" });
//   }
// };


/* ================= LOGIN ================= */
export const loginUser = async (req, res, next) => {
  console.log("👍👍👍👍☺1");

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
    console.log("User logged in:", user);
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



// export const updateUser = async (req, res, next) => {
//   try {
//     const {id} = req.body;
//     console.log("Update user endpoint hit for user ID:", id);
//     const { name, password, profileImage, preferences } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     if (name) user.name = name;
//     if (profileImage) user.profileImage = profileImage;
//     if (preferences) {
//       user.preferences = { ...user.preferences, ...preferences };
//     }

//     if (req.files && req.files.image) {
//       try {
//         const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path);
//         user.profileImage = imageUpload.secure_url;
//       } catch (error) {
//         return res.status(400).json({ msg: 'Image upload failed' });
//       }
//     }

//     if (password) {
//       try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;
//       } catch (error) {
//         return res.status(500).json({ msg: 'Password update failed' });
//       }
//     }

//     await user.save();

//     res.status(200).json({
//       msg: 'Profile updated successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profileImage: user.profileImage,
//         preferences: user.preferences,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Internal Server Error' });
//   }
// }


export const updateUser = async (req, res) => {
  try {
    const id = req.user._id.toString();
    console.log("Update user endpoint hit for user ID:", id);


    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, password } = req.body;

    let preferences = {};
    if (req.body.preferences) {
      preferences = JSON.parse(req.body.preferences);
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;

    if (preferences) {
      user.preferences = {
        ...user.preferences,
        ...preferences,
      };
    }

    // ✅ Image upload (multer + cloudinary)
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        user.profileImage = uploadResult.secure_url;
      } catch (error) {
        return res.status(400).json({ msg: "Image upload failed" });
      }
    }

    // ✅ Password update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      msg: "Profile updated successfully",
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
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id, role } = req.body;
    console.log("Update user role endpoint hit for user ID:", id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.status(200).json({ msg: 'User role updated successfully' });
  } catch (error) {
    next(error);
  }
};

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





// export async function addUserFaurout(req, res) {
//   try {
//     const userId = req.user._id; // from authMiddleware
//     const songId = req.params.songId;

//     const song = await Song.findById(songId);
//     if (!song) {
//       return res.status(404).json({ message: "Song not found" });
//     }

//     console.log("User ID:", userId, "Song ID:", song);
//     const user = await User.findById(userId);

//     // Check if song already exists in favourites
//     if (user.favouriteSongs.includes(songId)) {
//       return res.status(400).json({ message: "Song already in favourites" });
//     }

//     user.favouriteSongs.push(song);
//     await user.save();

//     res.status(200).json({ message: "Song added to favourites", favouriteSongs: user.favouriteSongs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Add a song to favourites
// router.post("/favourite/:songId", authMiddleware,


// export default router;


export async function addUserFavourite(req, res) {
  try {
    const userId = req.user._id;
    const songId = req.params.songId;

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ message: "Song not found" });

    const user = await User.findById(userId);

    // Check if song already exists in favourites
    if (user.favouriteSongs.some(s => s._id?.toString() === song._id.toString())) {
      return res.status(400).json({ message: "Song already in favourites" });
    }

    // Push full song object
    user.favouriteSongs.push({
      _id: song._id,
      title: song.title,
      artist: song.artists,
      // album: song.album,
      imageUrl: song.imageUrl,
      songUrl: song.songUrl,
      duration: song.duration,
    });

    await user.save();

    res.status(200).json({ message: "Song added to favourites", favouriteSongs: user.favouriteSongs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
