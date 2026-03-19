import React from "react";

const DropdownMenu = ({
  isOpen,
  primaryActionLabel,
  onPrimaryAction,
  onPlay,
  onAddToPlaylist,
  onViewDetails,
}) => {
  return (
    <div className={`dropdown-menu ${isOpen ? "open" : ""}`} role="menu" aria-hidden={!isOpen} onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={onPrimaryAction}>{primaryActionLabel}</button>
      <button type="button" onClick={onPlay}>Play Song</button>
      <button type="button" onClick={onAddToPlaylist}>Add to Playlist</button>
      <button type="button" onClick={onViewDetails}>View Details</button>
    </div>
  );
};

export default DropdownMenu;
