import React from "react";
import SongCard from "./SongCard";

const FavouriteSongsPage = ({ songs, onDeleteSong, onPlaySong, onAddToPlaylist, onViewSongDetails }) => {
  return (
    <section className="favourite-page">
      <header className="favourite-header">
        <p className="subtitle">Your Collection</p>
        <h1>Favourite Songs</h1>
      </header>

      {songs.length === 0 ? (
        <div className="empty-favourites">
          <h2>No songs in favourites</h2>
          <p>Add songs you love to see them here.</p>
        </div>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onDelete={() => onDeleteSong(song.id)}
              onPlay={() => onPlaySong(song)}
              onAddToPlaylist={() => onAddToPlaylist(song)}
              onViewDetails={() => onViewSongDetails(song)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavouriteSongsPage;
