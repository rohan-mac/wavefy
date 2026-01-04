// tracks.js
export async function getAllTracks() {
    let postData = {};
    try {
        let data = await fetch(
            "https://love-lyrics-backend.vercel.app/api/v1/tracks/getAllTrack",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            }
        );
        let array = await data.json();
        console.log(array);
        return array; // ✅ important if you want data outside
    } catch (error) {
        console.log(error);
    }
}



export async function getArtists() {
    try {
        let response = await fetch("https://love-lyrics-backend.vercel.app/api/v1/tracks/getArtists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        })
        let array = await response.json();
        return array;
    } catch (error) {
        console.log(error);
    }
}

export async function getAlbums() {
    try {
        let response = await fetch("https://love-lyrics-backend.vercel.app/api/v1/Album/GetAllAlbum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        })
        let array = await response.json();
        return array;
    } catch (error) {
        console.log(error);
    }
}