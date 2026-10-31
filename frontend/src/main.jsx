import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tokens.css";
import "./styles/editorial.css";
import CursorAsterisk from "./components/editorial/CursorAsterisk";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CursorAsterisk />
      <App />
    </BrowserRouter>
  </StrictMode>
);
