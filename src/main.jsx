import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Elements>
    <App />
  </Elements>
  // </React.StrictMode>,
);
