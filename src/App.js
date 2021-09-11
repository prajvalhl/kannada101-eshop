import React from "react";
import { Header } from "./components/Header";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { useNav } from "./navigation-context";

function App() {
  const { route } = useNav();

  return (
    <div className="App">
      <Header />
      {route === "product" && <ProductListing />}
      {route === "cart" && <Cart />}
    </div>
  );
}

export default App;
