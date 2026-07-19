import { createContext, useState } from "react";
import { getSong } from "./service/song.api";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSongState] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setCurrentSong = (nextSong, index = -1) => {
    setCurrentSongState(nextSong);
    setSong(nextSong);

    if (index >= 0) {
      setCurrentSongIndex(index);
    }
  };

  const fetchSongsByMood = async (mood) => {
    setLoading(true);
    setError("");

    try {
      const data = await getSong({ mood });
      const fetchedSongs = data.songs || [];
      setSongs(fetchedSongs);

      if (fetchedSongs.length > 0) {
        setCurrentSong(fetchedSongs[0], 0);
      } else {
        setCurrentSong(null, -1);
      }

      return fetchedSongs;
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch songs.");
      setSongs([]);
      setCurrentSong(null, -1);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const playSong = (index) => {
    if (!songs[index]) return;
    setCurrentSong(songs[index], index);
  };

  const playNext = () => {
    if (!songs.length) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex], nextIndex);
  };

  const playPrevious = () => {
    if (!songs.length) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex], prevIndex);
  };

  return (
    <SongContext.Provider
      value={{
        song,
        songs,
        currentSong,
        currentSongIndex,
        loading,
        error,
        setSong,
        setCurrentSong,
        fetchSongsByMood,
        playSong,
        playNext,
        playPrevious,
        setLoading,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
