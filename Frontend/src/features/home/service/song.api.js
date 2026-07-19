import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get(`/api/songs?mood=${mood}`);
  return response.data;
}

export async function getAllSongs() {
  const response = await api.get("/api/songs/all");
  return response.data;
}

export async function uploadSong(formData) {
  const response = await api.post("/api/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateSong(songId, formData) {
  const response = await api.put(`/api/songs/${songId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteSong(songId) {
  const response = await api.delete(`/api/songs/${songId}`);
  return response.data;
}
