import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/player";
import useSong from "../hooks/useSong";
import "./home.scss";

const Home = () => {
  const { handleGetSong, songs, currentSong, playSong, loading, error } =
    useSong();

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <div className="home-page__hero-top">
          <div>
            <h1>Moodify</h1>
            <p>Detect your expression and enjoy a mood-based playlist.</p>
          </div>
          <a className="home-page__admin-link" href="/admin">
            Go to Admin
          </a>
        </div>
      </div>

      <div className="home-page__content">
        <div className="home-page__panel">
          <FaceExpression
            onClick={(expression) => {
              handleGetSong({ mood: expression });
            }}
          />
        </div>

        <div className="home-page__panel home-page__panel--player">
          <Player />

          {loading ? (
            <p className="home-page__state">Loading playlist...</p>
          ) : null}
          {error ? (
            <p className="home-page__state home-page__state--error">{error}</p>
          ) : null}

          {!loading && !error && songs.length === 0 ? (
            <p className="home-page__state">
              No songs available for this mood.
            </p>
          ) : null}

          {songs.length > 0 ? (
            <div className="playlist">
              <h3>Playlist</h3>
              <div className="playlist__list">
                {songs.map((songItem, index) => (
                  <button
                    key={songItem._id || `${songItem.title}-${index}`}
                    className={`playlist__item ${currentSong?._id === songItem._id ? "playlist__item--active" : ""}`}
                    onClick={() => playSong(index)}
                  >
                    <img
                      src={
                        songItem.posterUrl ||
                        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={songItem.title}
                      className="playlist__poster"
                    />
                    <div className="playlist__meta">
                      <strong>{songItem.title}</strong>
                      <span>{songItem.artist}</span>
                      <small>{songItem.mood}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
