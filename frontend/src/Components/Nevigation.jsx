import React from "react";

function Nevigation() {
  return (
    <div className="header-search">
      <input
        type="text"
        placeholder="Search songs, artists, albums..."
        className="search-input"
      />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default Nevigation;
