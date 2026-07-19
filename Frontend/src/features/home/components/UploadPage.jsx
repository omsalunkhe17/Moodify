import { useState } from "react";
import { uploadSong } from "../service/song.api";
import SongForm from "./SongForm";
import "./AdminDashboard.scss";

const UploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await uploadSong(formData);
      setMessage("Song uploaded successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <div>
          <h2>Upload Song</h2>
          <p>Add a new song for the mood-based playlist.</p>
        </div>
        <div className="admin-dashboard__links">
          <a className="admin-dashboard__link" href="/">
            Home
          </a>
          <a className="admin-dashboard__link" href="/admin">
            Back to Dashboard
          </a>
        </div>
      </div>

      {message ? (
        <div className="admin-dashboard__message">{message}</div>
      ) : null}
      {error ? <div className="admin-dashboard__error">{error}</div> : null}

      <section className="admin-dashboard__panel">
        <SongForm
          onSubmit={handleSubmit}
          isLoading={loading}
          submitLabel="Upload Song"
        />
      </section>
    </div>
  );
};

export default UploadPage;
