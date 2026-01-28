
const BASE_URL = "https://wavefy.onrender.com/api";


export async function SignupUser(data) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    body: formData, // ❗ DO NOT set headers
  });

  if (response?.token) {
    localStorage.setItem("wavefytoken", response.token);
  }
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.msg || "Signup failed");
  }

  return response.json();
};


export async function loginUser(params) {
  try {

    const response = await fetch(`${BASE_URL}/users/login`, {
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
    console.log(data);

    // ✅ correct condition
    if (data?.token) {
      localStorage.setItem("wavefytoken", data.token);
    }

    return data;
  } catch (error) {
    console.error("error in login function:", error.message);
    return { error: error.message };
  }
};

export async function logoutUser() {
  try {
    localStorage.removeItem("wavefytoken");
    return { message: "Logout successful" };
  } catch (error) {
    console.error("logoutUser error:", error);
    return { error: error.message };
  }
};


export async function fetchUserProfile() {
  try {
    const token = localStorage.getItem("wavefytoken");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`${BASE_URL}/users/allusers`, {
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
};


export async function deleteUserAccount(id) {
  try {
    const token = localStorage.getItem("wavefytoken");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete account");

    const data = await response.json();
    console.log("deleteUserAccount response data:", data);
  } catch (error) {
    console.error("deleteUserAccount error:", error);
    return { error: error.message };
  }
};

export async function updateUserProfile(formData) {
  try {
    const token = localStorage.getItem("wavefytoken");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/users/updateuser`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ do NOT set Content-Type
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to update profile");

    const data = await response.json();
    console.log("updateUserProfile response data:", data);
  } catch (error) {
    console.error("updateUserProfile error:", error);
    return { error: error.message };
  }
}

export async function updateUserRoleByAdmin({ id, role }) {
  try {
    console.log("updateUserRoleByAdmin called with:", { id, role });

    const token = localStorage.getItem("wavefytoken");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/users/updateuserrole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, role }),
    });

    if (!response.ok) throw new Error("Failed to update user role");

    const data = await response.json();
    console.log("updateUserRoleByAdmin response data:", data);
  } catch (error) {
    console.error("updateUserRoleByAdmin error:", error);
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
};


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
    console.log(array);

    return array;
  } catch (error) {
    console.log(error);
  }
};


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
};

