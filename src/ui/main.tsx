import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppBar from "./components/appBar";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="h-screen w-screen flex flex-col">
      <AppBar />
      <main className="flex-1"> {/* your app content */} </main>
    </div>
  </StrictMode>
);
