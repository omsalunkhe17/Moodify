import { useEffect, useState } from "react";
import "./SongForm.scss";

const defaultValues = {
  mood: "happy",
  songFile: null,
};

const SongForm = ({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel,
  mode = "create",
}) => {
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        mood: initialValues.mood || "happy",
        songFile: null,
      });
    } else {
      setFormValues(defaultValues);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: files[0] || null }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = new FormData();
    payload.append("mood", formValues.mood);

    if (formValues.songFile) {
      payload.append("song", formValues.songFile);
    }

    onSubmit(payload);
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <div className="song-form__group">
        <label htmlFor="mood">Mood</label>
        <select
          id="mood"
          name="mood"
          value={formValues.mood}
          onChange={handleChange}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="surprised">Surprised</option>
        </select>
      </div>

      <div className="song-form__group">
        <label htmlFor="songFile">Song File (.mp3)</label>
        <input
          id="songFile"
          name="songFile"
          type="file"
          accept=".mp3,audio/mpeg"
          onChange={handleFileChange}
          required={mode === "create"}
        />
      </div>

      <button type="submit" className="song-form__button" disabled={isLoading}>
        {isLoading ? <span className="spinner" /> : null}
        {isLoading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
};

export default SongForm;
