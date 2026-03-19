import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../style/SongCard.css";

const SongCard = ({
  song,
  onPrimaryAction,
  primaryActionLabel = "Remove from Favourites",
  onPlay,
  onAddToPlaylist,
  onViewDetails,
  onCardClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenuAndRun = (callback) => {
    setIsMenuOpen(false);
    callback?.();
  };

  return (
    <article className="song-card" ref={cardRef} onClick={onCardClick}>
      <div className="song-cover-wrapper">
        <img src={song.coverImage} alt={`${song.title} cover`} className="song-cover" />
        <button
          type="button"
          className="menu-trigger"
          onClick={handleMenuToggle}
          aria-label={`Open menu for ${song.title}`}
          aria-expanded={isMenuOpen}
        >
          ⋮
        </button>
        <DropdownMenu
          isOpen={isMenuOpen}
          primaryActionLabel={primaryActionLabel}
          onPrimaryAction={() => closeMenuAndRun(onPrimaryAction)}
          onPlay={() => closeMenuAndRun(onPlay)}
          onAddToPlaylist={() => closeMenuAndRun(onAddToPlaylist)}
          onViewDetails={() => closeMenuAndRun(onViewDetails)}
        />
      </div>

      <div className="song-meta">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </article>
  );
};

export default SongCard;
