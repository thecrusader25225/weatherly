import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const MIN_WIDTH = 800;
const MIN_HEIGHT = 900;
let resizing = false;

const checkWindowSize = () => {
  if (!resizing) {
    resizing = true;
    if (window.innerWidth < MIN_WIDTH)
      window.resizeTo(MIN_WIDTH + 1, window.innerHeight);
    if (window.innerHeight < MIN_HEIGHT)
      window.resizeTo(window.innerWidth, MIN_HEIGHT + 1);
    setTimeout(() => {
      resizing = false;
    }, 100);
  }
};

window.addEventListener("resize", checkWindowSize);

checkWindowSize(); //initial check
reportWebVitals();
