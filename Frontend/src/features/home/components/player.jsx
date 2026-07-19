import { useEffect, useRef, useState } from "react";
import useSong from "../hooks/useSong";
import "./player.scss";

const formatTime = (value) => {
  if (!Number.isFinite(value) || value < 0) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Player = () => {
  const {
    song,
    loading,
    songs,
    currentSongIndex,
    playNext,
    playPrevious,
    setCurrentSong,
  } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setCurrentTime(0);
      playNext();
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song?.url, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [playbackRate, volume, isMuted, song?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    const startPlayback = () => {
      if (!isPlaying) {
        audio.pause();
        return;
      }

      audio.play().catch(() => setIsPlaying(false));
    };

    const handleCanPlay = () => {
      startPlayback();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.load();
    startPlayback();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [song?.url, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const skipBy = (seconds) => {
    if (!audioRef.current) return;

    const nextTime = Math.max(
      0,
      Math.min(
        duration || audioRef.current.duration || 0,
        audioRef.current.currentTime + seconds,
      ),
    );
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleProgressChange = (event) => {
    if (!audioRef.current) return;

    const nextTime = Number(event.target.value);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSpeedChange = (event) => {
    setPlaybackRate(Number(event.target.value));
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(1);
      return;
    }

    setIsMuted(true);
  };

  if (!song) {
    return (
      <div className="player-wrapper">
        <div className="player-card player-card--empty">
          <p>Select a mood to start the playlist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-wrapper">
      <audio ref={audioRef} src={song?.url || ""} preload="metadata" />

      <div className="player-card">
        <img
          src={
            song?.posterUrl ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80"
          }
          alt={song?.title || "Song poster"}
          className="player-poster"
        />

        <div className="player-info-section">
          <div className="player-header-row">
            <div>
              <h3 className="player-title">{song.title}</h3>
              <p className="player-subtitle">{song.mood} mood</p>
            </div>
            <span className="player-badge">Now playing</span>
          </div>

          <div className="player-progress-wrap">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="player-range"
            />
            <div className="player-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-controls-row">
            <button
              type="button"
              onClick={playPrevious}
              className="player-control-button"
            >
              ⏮ Prev
            </button>
            <button
              type="button"
              onClick={() => skipBy(-5)}
              className="player-control-button"
            >
              ⏪ 5s
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="player-play-button"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => skipBy(5)}
              className="player-control-button"
            >
              5s ⏩
            </button>
            <button
              type="button"
              onClick={playNext}
              className="player-control-button"
            >
              Next ⏭
            </button>
          </div>

          <div className="player-bottom-row">
            <label className="player-speed-label">
              Speed
              <select
                value={playbackRate}
                onChange={handleSpeedChange}
                className="player-select"
              >
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </label>

            <label className="player-speed-label">
              Volume
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="player-volume"
              />
              <button
                type="button"
                onClick={toggleMute}
                className="player-control-button"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </label>

            <span className="player-status-text">
              {loading ? "Loading song..." : isPlaying ? "Playing" : "Paused"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
