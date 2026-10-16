import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const racine = document.getElementById("root");

if (racine) {
  ReactDOM.createRoot(racine).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
