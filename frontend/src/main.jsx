import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./hooks/useUser.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </StrictMode>
);
