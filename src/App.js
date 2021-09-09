import React, { useState } from "react";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { ProductListing } from "./components/ProductListing";
import { Cart } from "./components/Cart";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <Header />
        </div>
        <div className="side-menu">
          <Filters />
        </div>
        <div className="main">
          <ProductListing />
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
