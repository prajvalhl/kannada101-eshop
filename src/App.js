import React from "react";
import { Header } from "./components/Header";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { useNav } from "./navigation-context";
import { Footer } from "./components/Footer";

function App() {
  const { route } = useNav();

  return (
    <div className="App">
      <Header />
      {route === "product" && <ProductListing />}
      {route === "cart" && <Cart />}
      <Footer />
    </div>
  );
}

export default App;
