import React from "react";

const DropdownMenu = ({ isOpen, onDelete, onPlay, onAddToPlaylist, onViewDetails }) => {
  return (
    <div className={`dropdown-menu ${isOpen ? "open" : ""}`} role="menu" aria-hidden={!isOpen}>
      <button type="button" onClick={onDelete}>Delete from Favourites</button>
      <button type="button" onClick={onPlay}>Play Song</button>
      <button type="button" onClick={onAddToPlaylist}>Add to Playlist</button>
      <button type="button" onClick={onViewDetails}>View Details</button>
    </div>
  );
};

export default DropdownMenu;
