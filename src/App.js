import React from "react";
import { Header } from "./components/Header";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { ProductDetails } from "./components/ProductDetails";
import { NotFound } from "./components/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
