import { useEffect, useState } from "react";
import { getAlbums } from "../api";
import "../Albums.css"
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Albums = () => {

    const [albums, setAlbums] = useState([]);
    const nevigation = useNavigate()
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await getAlbums();
                console.log(data.Data, "albbbbbbbbbbbbbb");
                setAlbums(data.Data || []);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchAlbums();
    }, []);


    function hitAlbums(albums) {
        console.log(albums, "fghkhghjkl")
        nevigation(`/albums/${albums._id}`, { state: albums });

    }


    return (
        <div className="albums-page">

            {albums.length === 0 ? (
                <Loader />
            ) :
                (
                    albums.map((album) => (
                    <div key={album._id} className="album-card" onClick={() => hitAlbums(album)}>
                        <div className="albumImage">
                            <img
                                src={album.Image || "src/assets/Gemini_Generated_Image_afrpjbafrpjbafrp.png"}
                                alt={album.Title || "Unknown Album"}
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div>
                            <p>{album.Name}</p>
                        </div>
                    </div>
                ))
            )
            }
        </div>
    );
}

export default Albums;