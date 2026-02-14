import React from "react";
import "../style/SongSkeleton.css";

const SongSkeleton = () => {
  return (
    <div className="all-songs skeleton-card">
      <div className="skeleton-img"></div>

      <div className="skeleton-text title"></div>
      <div className="skeleton-text artist"></div>
    </div>
  );
};

export default SongSkeleton;
