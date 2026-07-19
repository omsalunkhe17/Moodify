import { useEffect, useState } from "react";
import { deleteSong, getAllSongs } from "../service/song.api";
import "./AdminDashboard.scss";

const SongListPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadSongs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllSongs();
      setSongs(response.songs || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const handleDelete = async (songId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this song?",
    );
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await deleteSong(songId);
      setMessage("Song deleted successfully.");
      await loadSongs();
    } catch (err) {
      setError(err?.response?.data?.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <div>
          <h2>All Songs</h2>
          <p>Manage the uploaded library.</p>
        </div>
        <a className="admin-dashboard__link" href="/admin">
          Back to Dashboard
        </a>
      </div>

      {message ? (
        <div className="admin-dashboard__message">{message}</div>
      ) : null}
      {error ? <div className="admin-dashboard__error">{error}</div> : null}

      <section className="admin-dashboard__panel">
        {loading ? <p>Loading songs...</p> : null}
        <div className="admin-dashboard__list">
          {songs.map((song) => (
            <div key={song._id} className="admin-dashboard__item">
              <img
                src={song.posterUrl}
                alt={song.title}
                className="admin-dashboard__poster"
              />
              <div className="admin-dashboard__item-content">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
                <span>{song.mood}</span>
              </div>
              <div className="admin-dashboard__actions">
                <button onClick={() => handleDelete(song._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SongListPage;
