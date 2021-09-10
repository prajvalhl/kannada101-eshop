import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./cart-context";
import { NavProvider } from "./navigation-context";

ReactDOM.render(
  <React.StrictMode>
    <NavProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NavProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
