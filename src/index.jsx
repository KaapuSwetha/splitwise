import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
/* The following line can be included in a src/App.scss */
{
  /* The following line can be included in your src/index.js or App.js file */
}

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
