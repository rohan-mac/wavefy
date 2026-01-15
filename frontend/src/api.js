export async function SignupUser(params) {
  try {

    const response = await fetch("https://wavefy.onrender.com/api/users/register", {
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

    const response = await fetch("https://wavefy.onrender.com/api/users/login", {
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


export async function fetchUserProfile() {
  try {
    const token = localStorage.getItem("wavefytoken");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch("https://wavefy.onrender.com/api/users/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchUserProfile error:", error);
    return { error: error.message };
  }
}


  export async function getAllTracks() {
    try {
      const response = await fetch(
        //   `${import.meta.env.VITE_API_URL}/api/songs/allsongs`,
        "https://wavefy.onrender.com/api/songs/allsongs",
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