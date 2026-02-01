import React, { useRef, useState } from "react";
import "../Player.css";

const Player = ({ track }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);


  // console.log(track);
  
  const togglePlay = () => {
    if (!track) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(current || 0);
  };

  const handleSeek = (e) => {
    const time =
      (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={track?.audioUrl || track?.Url}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Song Info */}
      <div className="player-info">
        <img
          src={track?.imageUrl || track?.Image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="cover"
        />
        <div>
          <h4>{track?.title || track?.Name || "No song playing"}</h4>
          <span>{track?.artists?.[0] || track?.Artists?.[0] || "Select a song"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="player-controls">
        <div onClick={togglePlay} className="play-pause-button">

          <button>⏮</button>
          <button className="play" onClick={togglePlay}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button>⏭</button>
        </div>

        <input
          type="range"
          value={progress}
          onChange={handleSeek}
        />
      </div>

      {/* Volume */}
      <div className="player-volume">
        🔊
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default Player;
