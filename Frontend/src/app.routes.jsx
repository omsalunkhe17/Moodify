import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/pages/home";
import AdminDashboard from "./features/home/components/AdminDashboard";
import UploadPage from "./features/home/components/UploadPage";
import SongListPage from "./features/home/components/SongListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <AdminDashboard />
      </Protected>
    ),
  },
  {
    path: "/admin/upload",
    element: (
      <Protected>
        <UploadPage />
      </Protected>
    ),
  },
  {
    path: "/admin/songs",
    element: (
      <Protected>
        <SongListPage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
