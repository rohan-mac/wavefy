import React from "react";

function Nevigation() {
  return (
    <div className="header-search">
      <input
        type="text"
        placeholder="Search songs, artists, albums..."
        className="search-input"
      />
      {/* <button className="search-btn">🔍</button> */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
}

export default Nevigation;
