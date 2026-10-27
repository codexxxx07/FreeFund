import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import ClickSpark from "./components/common/ClickSpark";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClickSpark
        sparkColor={["#6366f1", "#a855f7", "#ec4899", "#f59e0b"]}
        sparkCount={10}
        sparkSize={12}
        sparkRadius={35}
        duration={400}
        easing="ease-out"
        glow={0.3}
      >
        <App />
      </ClickSpark>
    </BrowserRouter>
  </StrictMode>
);
