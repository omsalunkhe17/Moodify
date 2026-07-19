import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SongContextProvider>
        <App />
      </SongContextProvider>
    </AuthProvider>
  </StrictMode>
);