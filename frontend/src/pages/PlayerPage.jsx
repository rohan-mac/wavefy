import { useLocation } from "react-router-dom";
import Player from "../Components/Player";
// import Player from "../components/Player";

const PlayerPage = () => {
  const { state } = useLocation();

  return <Player track={state?.track} />;
};

export default PlayerPage;
