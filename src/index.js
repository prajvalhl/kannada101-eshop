import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { CartProvider } from "./cart-context";
import { WishListProvider } from "./wishlist-context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <WishListProvider>
          <App />
        </WishListProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
