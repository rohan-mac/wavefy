import cloudinary from "../config/cloudinary.js";
import Artist from "../models/artists.js";
import Song from "../models/song.js";


export async function getAllArtists(req, res) {
    console.log("dfghjkl;' 👍👍");

    try {
        const allArtists = await Artist.find({});
        res.status(200).json(allArtists);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}



export async function getArtistById(req, res) {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}



// export async function createArtist(req, res) {
//     try {
//         const { name, genre, bio } = req.body;

//         if (!name || !genre) {
//             return res.status(400).json({ message: "Name and genre are required" });
//         }

//         // Escape name for regex safety
//         const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

//         // 1️⃣ Create artist
//         const artist = await Artist.create({ name, genre, bio });

//         // 2️⃣ Find matching songs
//         const matchedSongs = await Song.find({
//             artists: { $regex: `^${escapedName}$`, $options: "i" }
//         });

//         // 3️⃣ Link songs to artist
//         artist.songs = matchedSongs.map(song => song._id);
//         await artist.save();

//         // 4️⃣ OPTIONAL: Link artist to songs
//         await Song.updateMany(
//             { _id: { $in: artist.songs } },
//             { $addToSet: { artist: artist._id } }
//         );

//         res.status(201).json({
//             message: "Artist created & songs linked successfully",
//             artist
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// }


export async function createArtist(req, res) {
    try {
        const { name, bio } = req.body;
console.log("Creating artist:", name, bio,' 👍👍');
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        // 1️⃣ Upload image (if exists)
        let imageUrl = "";

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "artists",
            });
            imageUrl = uploadResult.secure_url;
        }

        // Escape name for regex safety
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // 2️⃣ Create artist
        const artist = await Artist.create({
            name,
            bio,
            profileImage: imageUrl, // ✅ match schema
        });


        // 3️⃣ Find matching songs
        const matchedSongs = await Song.find({
            artists: { $regex: `^${escapedName}$`, $options: "i" },
        });

        // 4️⃣ Link songs → artist
        artist.songs = matchedSongs.map((song) => song._id);
        await artist.save();

        // 5️⃣ Link artist → songs
        await Song.updateMany(
            { _id: { $in: artist.songs } },
            { $addToSet: { artist: artist._id } }
        );

        res.status(201).json({
            message: "Artist created successfully",
            artist,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateArtist(req, res) {
    try {
        const artistId = req.params.id;
        const { name, genre, bio } = req.body;

        const updatedArtist = await Artist.findByIdAndUpdate(
            artistId,
            { name, genre, bio },
            { new: true }
        );
        if (!updatedArtist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.status(200).json(updatedArtist);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export async function deleteArtist(req, res) {
    try {
        const artistId = req.params.id;
        const deletedArtist = await Artist.findByIdAndDelete(artistId);
        if (!deletedArtist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.status(200).json({ message: "Artist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
