import React, { useState } from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/player";
import FeatureCard from "../components/FeatureCard";
import useSong from "../hooks/useSong";
import "./home.scss";

const Home = () => {
  const { handleGetSong, songs, currentSong, playSong, loading, error } =
    useSong();
  const [hasDetected, setHasDetected] = useState(false);

  const showWelcome = !hasDetected;

  const handleDetectExpression = (expression) => {
    setHasDetected(true);
    handleGetSong({ mood: expression });
  };

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <div className="home-page__hero-top">
          <div className="home-page__brand">
            <div className="home-page__brand-icon">🎵</div>
            <div>
              <h1>Moodify</h1>
              <p>Detect. Feel. Enjoy.</p>
            </div>
          </div>
          <a className="home-page__admin-link" href="/admin">
            Go to Admin
          </a>
        </div>
      </div>

      <div className="home-page__content">
        <div className="home-page__panel">
          <div className="camera-card">
            <div className="camera-card__top">
              <span className="camera-card__badge">
                <span className="camera-card__badge-dot" />
                Live Camera
              </span>
              <span className="camera-card__live">Ready</span>
            </div>

            <FaceExpression onClick={handleDetectExpression} />
          </div>
        </div>

        <div className="home-page__panel home-page__panel--player">
          {showWelcome ? (
            <div className="welcome-panel">
              <div className="welcome-panel__badge">🤖 AI Powered</div>
              <h2 className="welcome-panel__title">Welcome to Moodify</h2>
              <p className="welcome-panel__lead">
                AI-powered music recommendations based on your facial
                expression.
              </p>
              <p className="welcome-panel__description">
                Detect your mood and instantly receive a personalized playlist.
              </p>

              <div className="welcome-panel__features">
                <FeatureCard
                  icon="😊"
                  title="Detect Your Mood"
                  description="AI analyzes your facial expression."
                />
                <FeatureCard
                  icon="🎵"
                  title="Personalized Playlists"
                  description="Songs selected based on your mood."
                />
                <FeatureCard
                  icon="⚡"
                  title="Automatic Next Song"
                  description="Continuous playback without interruption."
                />
                <FeatureCard
                  icon="☁"
                  title="Upload Songs"
                  description="Admins can upload their own music."
                />
              </div>

              <div className="welcome-panel__steps">
                <h3>How it works</h3>
                <ol>
                  <li>Allow camera access.</li>
                  <li>Click Detect Expression.</li>
                  <li>AI detects your mood.</li>
                  <li>Playlist appears automatically.</li>
                </ol>
              </div>

              <button
                type="button"
                className="welcome-panel__button"
                onClick={() => {
                  const detectButton = document.querySelector(
                    ".face-expression__button",
                  );
                  if (detectButton) {
                    detectButton.click();
                  }
                }}
              >
                📷 Detect Expression
              </button>
            </div>
          ) : (
            <>
              <Player />

              {loading ? (
                <p className="home-page__state">Loading playlist...</p>
              ) : null}
              {error ? (
                <p className="home-page__state home-page__state--error">
                  {error}
                </p>
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
            </>
          )}
        </div>
      </div>

      <div className="home-page__footer">
        <div className="home-page__footer-bar">
          <span>🎵 Moodify</span>
          <span>Your Mood. Your Music.</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
