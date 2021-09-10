import React from "react";
import { Header } from "./components/Header";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { useNav } from "./navigation-context";

function App() {
  const { route } = useNav();

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          {route === "product" && <ProductListing />}
          {route === "cart" && <Cart />}
        </div>
      </div>
    </div>
  );
}

export default App;
