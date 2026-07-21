import { useEffect, useMemo, useState } from "react";
import {
  deleteSong,
  getAllSongs,
  updateSong,
  uploadSong,
} from "../service/song.api";
import SongForm from "./SongForm";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [editingSong, setEditingSong] = useState(null);

  const loadSongs = async () => {
    setLoading(true);
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

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch = `${song.title} ${song.artist}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMood = moodFilter === "all" || song.mood === moodFilter;
      return matchesSearch && matchesMood;
    });
  }, [songs, search, moodFilter]);

  const handleCreate = async (formData) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await uploadSong(formData);
      setMessage("Song uploaded successfully.");
      await loadSongs();
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (songId, formData) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await updateSong(songId, formData);
      setMessage("Song updated successfully.");
      setEditingSong(null);
      await loadSongs();
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

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
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__heading">
          <div className="admin-dashboard__icon">🎵</div>
          <div>
            <h2>Admin Dashboard</h2>
            <p>Manage songs, uploads, and playlists with ease.</p>
          </div>
        </div>

        <div className="admin-dashboard__links" aria-label="Admin navigation">
          <a className="admin-dashboard__link" href="/">
            <span>🏠</span>
            Home
          </a>
          <a
            className="admin-dashboard__link admin-dashboard__link--active"
            href="/admin/upload"
          >
            <span>⬆️</span>
            Upload Song
          </a>
        </div>
      </header>

      {message ? (
        <div className="admin-dashboard__message">{message}</div>
      ) : null}
      {error ? <div className="admin-dashboard__error">{error}</div> : null}

      <div className="admin-dashboard__grid">
        <section className="admin-dashboard__panel admin-dashboard__panel--form">
          <div className="admin-dashboard__panel-head">
            <div>
              <h3>Upload Song</h3>
              <p>Add a new track for mood-based playback.</p>
            </div>
          </div>
          <SongForm
            onSubmit={handleCreate}
            isLoading={loading}
            submitLabel="Upload Song"
          />
        </section>

        <section className="admin-dashboard__panel admin-dashboard__panel--list">
          <div className="admin-dashboard__panel-head">
            <div>
              <h3>All Songs</h3>
              <p>Browse and manage your current library.</p>
            </div>
          </div>

          <div className="admin-dashboard__filters">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search songs"
            />
            <select
              value={moodFilter}
              onChange={(event) => setMoodFilter(event.target.value)}
            >
              <option value="all">All moods</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="surprised">Surprised</option>
            </select>
          </div>

          {loading ? (
            <div className="admin-dashboard__loading">
              <span className="spinner" /> Loading songs...
            </div>
          ) : null}

          <div className="admin-dashboard__list">
            {filteredSongs.map((song) => (
              <div key={song._id} className="admin-dashboard__item">
                <img
                  src={
                    song.posterUrl ||
                    "https://via.placeholder.com/120x120?text=No+Poster"
                  }
                  alt={song.title}
                  className="admin-dashboard__poster"
                />
                <div className="admin-dashboard__item-content">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                  <span>{song.mood}</span>
                </div>
                <div className="admin-dashboard__actions">
                  <button onClick={() => setEditingSong(song)}>Edit</button>
                  <button onClick={() => handleDelete(song._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {editingSong ? (
        <section className="admin-dashboard__panel admin-dashboard__panel--edit">
          <div className="admin-dashboard__panel-head">
            <div>
              <h3>Edit Song</h3>
              <p>Update the selected track details.</p>
            </div>
          </div>
          <SongForm
            initialValues={editingSong}
            onSubmit={(formData) => handleEdit(editingSong._id, formData)}
            isLoading={loading}
            submitLabel="Save Changes"
            mode="edit"
          />
        </section>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
