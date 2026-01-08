export async function SignupUser(params) {
  try {

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    // ❗ handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }


    const data = await response.json();

    // ✅ correct condition
    if (data?.token) {
      localStorage.setItem("wavefytoken", data.token);
    }

    return data;
  } catch (error) {
    console.error("error in login function:", error.message);
    return { error: error.message };
  }
}



export async function loginUser(params) {
  try {

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    // ❗ handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }


    const data = await response.json();

    // ✅ correct condition
    if (data?.token) {
      localStorage.setItem("wavefytoken", data.token);
    }

    return data;
  } catch (error) {
    console.error("error in login function:", error.message);
    return { error: error.message };
  }
}


export async function getAllTracks() {
  try {
    const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/api/songs/allsongs`,
      "http://localhost:5000/api/songs/allsongs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }

    const data = await response.json();

    return data; // ✅ IMPORTANT
  } catch (error) {
    console.error("getAllTracks error:", error);
    return [];
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