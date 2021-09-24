import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { CartProvider } from "./cart-context";
import { NavProvider } from "./navigation-context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </NavProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
