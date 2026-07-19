import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/styles/global.scss";
import { useEffect } from "react";
import { useAuth } from "./features/auth/hooks/useAuth";

function App() {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;