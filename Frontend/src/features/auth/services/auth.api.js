import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ email, password, username }) {
  const response = await api.post("/api/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
}

export async function login({ email, username, password }) {
  const data = { email, username, password };

  console.log("Sending:", data);

  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    throw err;
  }
}

export async function getMe() {
  const response = await api.get("/api/auth/get-me");
  return response.data;
}

export async function logout() {
  const response = await api.get("/api/auth/logout");
  return response.data;
}
