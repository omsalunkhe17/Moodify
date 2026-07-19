import { useContext } from "react";
import { SongContext } from "../song.context";

const useSong = () => {
  const context = useContext(SongContext);

  const {
    song,
    songs,
    currentSong,
    currentSongIndex,
    loading,
    error,
    fetchSongsByMood,
    playSong,
    playNext,
    playPrevious,
    setCurrentSong,
  } = context;

  async function handleGetSong({ mood }) {
    await fetchSongsByMood(mood);
  }

  return {
    song,
    songs,
    currentSong,
    currentSongIndex,
    loading,
    error,
    handleGetSong,
    playSong,
    playNext,
    playPrevious,
    setCurrentSong,
  };
};

export default useSong;
