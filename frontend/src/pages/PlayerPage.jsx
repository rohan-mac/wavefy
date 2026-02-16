import { useLocation } from "react-router-dom";
import Player from "../Components/Player";
import "../style/PlayerPage.css";

const PlayerPage = () => {
  const { state } = useLocation();
  const track = state?.track;

  if (!track) {
    return (
      <div className="player-page empty">
        <h2>No track selected 🎵</h2>
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="player-container">
        <div className="player-cover">
          <img
            src={track.imageUrl}
            alt={track.title}
          />
        </div>

        <div className="player-info">
          <h1>{track.title}</h1>
          <p>{track.artists?.[0]}</p>
        </div>

        <div className="player-controls">
          <Player track={track} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
