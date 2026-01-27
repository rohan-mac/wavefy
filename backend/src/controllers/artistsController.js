// import Artist from "../models/artists.js";
// import Song from "../models/song.js";


// export async function getAllArtists(req, res) {
//     try {
//         const allArtists = await Artist.find({});
//         res.status(200).json(allArtists);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }



// export async function getArtistById(req, res) {
//     try {
//         const artistId = req.params.id;
//         const artist = await Artist.findById(artistId);
//         if (!artist) {
//             return res.status(404).json({ message: "Artist not found" });
//         }
//         res.status(200).json(artist);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }

// // export async function createArtist(req, res) {
// //     try {
// //         const { name, genre, bio } = req.body;
// //         const newArtist = new artists({ name, genre, bio });
// //         await newArtist.save();
// //         res.status(201).json(newArtist);
// //     } catch (error) {
// //         res.status(500).json({ message: "Server error" });
// //     }
// // }


// export async function createArtist(req, res) {
//     try {
//         const { name, genre, bio } = req.body;

//         // 1️⃣ Create artist first
//         const artist = await Artist.create({ name, genre, bio });

//         // 2️⃣ Find songs matching artist name
//         const matchedSongs = await Song.find({
//             artistName: { $regex: `^${name}$`, $options: "i" }
//         });
//         artist.songs = matchedSongs.map(song => song._id);

//         await artist.save();

//         res.status(201).json({
//             message: "Artist created & songs linked",
//             artist,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }

// export async function updateArtist(req, res) {
//     try {
//         const artistId = req.params.id;
//         const { name, genre, bio } = req.body;

//         const updatedArtist = await Artist.findByIdAndUpdate(
//             artistId,
//             { name, genre, bio },
//             { new: true }
//         );
//         if (!updatedArtist) {
//             return res.status(404).json({ message: "Artist not found" });
//         }
//         res.status(200).json(updatedArtist);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }

// export async function deleteArtist(req, res) {
//     try {
//         const artistId = req.params.id;
//         const deletedArtist = await Artist.findByIdAndDelete(artistId);
//         if (!deletedArtist) {
//             return res.status(404).json({ message: "Artist not found" });
//         }
//         res.status(200).json({ message: "Artist deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }
